<?php

/*

Plugin Name: FIWI Debugger
Description: Debug tool for FIWI sites. Press CTRL + A to launch.
Version: 1.5.9
Author: Findsome & Winmore
Author URI: https://findsomewinmore.com/
Text Domain: fiwidebugger

*/


function fiwi_debugger() {
    echo '<script type="text/javascript" src="https://s3.amazonaws.com/fw-devtools/fiwi-debugger/fiwidebugger.min.js"></script>';
}
add_action( 'wp_footer', 'fiwi_debugger', 100 );


