<?php
/**
 * @package Rough Chart
 */
/*
Plugin Name: Rough Chart
Description: Rough Chart plugin developed for creating sketchy/hand-drawn styled charts, based on roughViz.js
Version: 1.0.0
Author: Artem Demo
License: GPLv2 or later
Text Domain: rough-chart
*/

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

Copyright 2019 Artem Demo
*/

if ( !function_exists( 'add_action') ) {
	echo 'Rough Chart plugin can\'t be called directly.';
	exit;
}

// Allow debugging messages.
// All the configuration is taken from: `wp-includes/load.php`
//error_reporting( E_ALL );
//ini_set( 'display_errors', 1 );


define( 'ROUGH_CHART_VERSION', '1.0.0' );
define( 'ROUGH_CHART_MINIMUM_WP_VERSION', '5.0.1' );
define( 'ROUGH_CHART_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'ROUGH_CHART_BASENAME', plugin_basename( __FILE__ ) );

register_activation_hook( __FILE__, array( 'RoughChart', 'plugin_activation' ) );
register_deactivation_hook(__FILE__, array( 'RoughChart', 'plugin_deactivation' ) );

require_once( ROUGH_CHART_PLUGIN_DIR . 'RoughChart.php' );

add_action( 'init', array( 'RoughChart', 'init' ) );

if ( is_admin() ) {
    require_once( ROUGH_CHART_PLUGIN_DIR . 'RoughChartAdmin.php' );
    add_action( 'init', array( 'RoughChartAdmin', 'init' ) );
}
