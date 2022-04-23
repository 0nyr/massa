#!/bin/bash

LIGHT_ORANGE_COLOR="\e[38;5;216m"
TURQUOISE_COLOR="\e[38;5;43m"
LIGHT_BLUE_COLOR="\e[38;5;153m"
RED_COLOR="\e[38;5;196m"
NO_COLOR="\e[0m"

echo -e "${TURQUOISE_COLOR}### starting massa node ###${NO_COLOR}"

# cd /opt/massa/massa_TEST.7.0_release_linux/massa/massa-node && ./massa-node
gnome-terminal\
    --window-with-profile=onyr_1\
    -- bash -c "cd /opt/massa/massa_TEST.9.2_release_linux/massa/massa-node; ./massa-node"\

echo -e "${TURQUOISE_COLOR}### starting massa node ###${NO_COLOR}"
# cd /opt/massa/massa_TEST.7.0_release_linux/massa/massa-client && ./massa-client
gnome-terminal\
    --window-with-profile=onyr_1\
    -- bash -c "cd /opt/massa/massa_TEST.9.2_release_linux/massa/massa-client; ./massa-client"\
