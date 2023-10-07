import os
import binascii

# -------------------- CLI arguments -------------------- #
import sys
import argparse
import hashlib
import base58

# wrapped program flags
class CLIArguments:
    args: argparse.Namespace

    def __init__(self) -> None:
        self.__log_raw_argv()
        self.__parse_argv()
    
    def __log_raw_argv(self) -> None:
        print("Passed program params:")
        for i in range(len(sys.argv)):
            print("param[{0}]: {1}".format(
                i, sys.argv[i]
            ))
    
    def __parse_argv(self) -> None:
        """
        python main [ARGUMENTS ...]
        """
        parser = argparse.ArgumentParser(description='Program [ARGUMENTS]')
        parser.add_argument(
            '--debug', 
            action='store_true',
            help="debug, True or False"
        )
        # add file path or directory path argument
        parser.add_argument(
            '--input',
            type=str,
            help="String or sequence of words (ex: \"hello world\") to generate a hex string from."
        )
        # nb bytes to take from each hash
        parser.add_argument(
            '--nb-bytes',
            type=int,
            default=4,
            help="Number of bytes to take from each hash."
        )

        # save parsed arguments
        self.args = parser.parse_args()

        # overwrite debug flag
        os.environ["DEBUG"] = "True" if self.args.debug else "False"

        # log parsed arguments
        print("Parsed program params:")
        for arg in vars(self.args):
            print("{0}: {1}".format(
                arg, getattr(self.args, arg)
            ))


def generate_hex_string(input_string=None):
    if input_string:
        input_bytes = input_string.encode('utf-8')
        needed_bytes = 32 - len(input_bytes)
    else:
        input_bytes = b''
        needed_bytes = 32

    if needed_bytes > 0:
        random_bytes = os.urandom(needed_bytes)
    else:
        random_bytes = b''

    final_bytes = input_bytes[:32] + random_bytes
    assert len(final_bytes) == 32
    hex_string = binascii.hexlify(final_bytes).decode('utf-8')
    
    return hex_string

def decode_hex_string(hex_string):
    """
    Returns a string in UTF-8 encoding, given a hex string.
    """
    try:
        res = binascii.unhexlify(hex_string).decode('utf-8')
    except binascii.Error:
        print("ERROR: Invalid hex string error: {}".format(hex_string))
        res = None
    except UnicodeDecodeError:
        print("ERROR: Invalid UTF-8 encoding: {}".format(hex_string))
        res = None
    return res

def generate_concatenated_hash(words, nb_first_bytes):
    concatenated_bytes = b''
    word_list = words.split()
    
    for word in word_list:
        # Create a SHA-256 hash object
        sha256_hash = hashlib.sha256()
        
        # Update the hash object with the bytes of the word
        sha256_hash.update(word.encode())
        
        # Get the hash bytes
        hash_bytes = sha256_hash.digest()
        
        # Take the first nb_first_bytes from the hash
        truncated_bytes = hash_bytes[:nb_first_bytes]
        
        # Concatenate the truncated bytes
        concatenated_bytes += truncated_bytes
    
    # Convert concatenated bytes to hex string
    print("generate_concatenated_hash:", binascii.hexlify(concatenated_bytes).decode('utf-8'))
    
    return concatenated_bytes

def double_sha256(data):
    return hashlib.sha256(hashlib.sha256(data).digest()).digest()

def base58_encode(bytes_input):
    """
    Base58 encoding function.
    Uses the 4 bytes checksum at the end of the input bytes.
    """
    alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    num = int.from_bytes(bytes_input, 'big')
    encode = ''
    
    while num > 0:
        num, remainder = divmod(num, 58)
        encode = alphabet[remainder] + encode
    
    pad = 0
    for b in bytes_input:
        if b == 0:
            pad += 1
        else:
            break
    
    return alphabet[0] * pad + encode

def base58_decode(base58_input):
    """
    Decodes a Base58 string into bytes
    """
    alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    num = 0
    for char in base58_input:
        num *= 58
        num += alphabet.index(char)
    
    num_bytes = num.to_bytes((num.bit_length() + 7) // 8, 'big')
    return num_bytes

def bytes_to_base58_library(input: bytes) -> str:
    """
    Converts input bytes to a base58 encoded string with a checksum.
    """
    return base58.b58encode_check(input).decode('utf-8')


def check_base58_checksum(base58_input):
    """
    Checks the checksum of a base58 encoded string.
    Returns True if the checksum is valid, False otherwise.
    """
    decoded = base58_decode(base58_input)
    payload = decoded[:-4]
    checksum = decoded[-4:]
    new_checksum = double_sha256(payload)[:4]
    
    return new_checksum == checksum

def check_base58_from_library(base58_str):
    """
    Checks if a string is a valid base58 encoded string with a correct checksum.
    Returns True if valid, False otherwise.
    """
    try:
        base58.b58decode_check(base58_str)
        return True
    # if any error, print error and return False
    except Exception as e:
        print("ERROR: Invalid base58 string: {}".format(base58_str))
        return False

   

if __name__ == "__main__":
    cli_args = CLIArguments()

    print(generate_hex_string())  # Should print a random 64-character hex string
    print("generate_hex_string('test'):", generate_hex_string("test"))  # Should start with the hex representation of "test"
    print("decode_hex_string(generate_hex_string('test')):", decode_hex_string(generate_hex_string('test')))  # Should print b'test'

    print(f"Generated from INPUT({cli_args.args.input}):", generate_hex_string(cli_args.args.input))

    # example base58
    example_base58 = "S12mnpzhmnE88zhwPKssESnz4BybRQoeEMh28WTx8VKPEJffHegw" # generated from https://massa.net/testnet/wallet
    print(f"Test Base58 checksum validity: {check_base58_checksum(example_base58)}", "and from library:", check_base58_from_library(example_base58))

    # Test the new function
    input_data = generate_concatenated_hash(cli_args.args.input, cli_args.args.nb_bytes)  # Replace this with the data you want to encode
    checksum = double_sha256(input_data)[:4]
    input_with_checksum = input_data + checksum
    encoded = base58_encode(input_with_checksum)
    encoded_using_library = bytes_to_base58_library(input_with_checksum)
    print(f"Base58 encoded data: {encoded}")
    print(f"Base58 encoded from library: {encoded_using_library}", f"of char length: {len(encoded_using_library)}")
    print(f"Base58 checksum validity: {check_base58_checksum(encoded)}", "and from library:", check_base58_from_library(encoded))
    print(f"Base58 encoded data string length: {len(encoded)}")

