# Massa

### Useful links

[Massa node wiki | GitHub](https://github.com/massalabs/massa/wiki) 🌟

## Notes

run massa

Simply run the binaries you downloaded in the previous step: Open the `massa-node` folder and run the `massa-node` excutable Open the `massa-client` folder and run the `massa-client` excutable

Your discord account `46**********` has been associated with this node ID: `7w************************************************` and this staking address: `2A************************************************`.
Congratulations!

create a `config.toml`, with the public ip address of the computer.

```toml
[network]
routable_ip = "2a06:****"

```

## Update

> We use the release version installed in `/opt/massa/`.

1. Get latest release [here | GitHub](https://github.com/massalabs/massa/releases)
2. Extract `.tar.gz` file: `tar -xf filename.tar.gz`
3. Move the extracted file into a new location inside `/opt/massa`: `sudo mv massa /opt/massa/massa_TEST.X.X_release_linux/`
4. The `config` folder of the `massa-node` "contains all node-related user config data that should be backed up.". So copy everything from the old to the new version.

   ```shell
   (base) onyr@aezyr:/opt/massa/massa_TEST.8.0_release_linux/massa/massa-node/config$ cp config.toml /opt/massa/massa_TEST.9.2_release_linux/massa-node/config/
   (base) onyr@aezyr:/opt/massa/massa_TEST.8.0_release_linux/massa/massa-node/config$ cp staking_keys.json /opt/massa/massa_TEST.9.2_release_linux/massa-node/config/
   (base) onyr@aezyr:/opt/massa/massa_TEST.8.0_release_linux/massa/massa-node/config$ cp node_privkey.key /opt/massa/massa_TEST.9.2_release_linux/massa-node/config/
   ```
5. Copy the `wallet.dat` similarly for `massa-client`:

   ```shell
   (base) onyr@aezyr:/opt/massa/massa_TEST.8.0_release_linux/massa/massa-node$ cd ../massa-client/
   (base) onyr@aezyr:/opt/massa/massa_TEST.8.0_release_linux/massa/massa-client$ cp wallet.dat /opt/massa/massa_TEST.9.2_release_linux/massa-client/
   ```
6. Update launcher script at `/opt/massa/`
7. Ask for faucets to the testnet. Since you are not registered yet, the bot will ask you to enter a command. Follow the instructions.
8. Make the node routable [(see here)](https://github.com/massalabs/massa/wiki/routability). This step should be already done since you copied previously set up routable node. Copy-paste the IP into discord-MASSA bot.
9. Time for staking. Ask for faucets into the dedicated channel in the MASSA discord server.
10. Start staking by using the following command into the `massa-client`: `buy_rolls Address RollCount Fee`. Fee can be 0. Don't ask for more Rolls than slices of 100 MASSA into wallet ballance.
11. The more rolls used for staking, the better for stability of the node.
