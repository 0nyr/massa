{
  description = "Python environment";

  inputs = {
    nixpkgs.url = github:NixOS/nixpkgs/nixos-unstable;
    flake-utils.url = github:numtide/flake-utils;
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        pythonPackages = pkgs.python311Packages;
      in
      {
        devShells.default = pkgs.mkShell {
          # packages needed to build the environment.

          # package needed at build and runtime.
          buildInputs = with pkgs; [
            # the environment.
            pythonPackages.python

            # testing
            pythonPackages.pytest

            # python packages
            pythonPackages.base58
          ];
        };
      }
    );
}
