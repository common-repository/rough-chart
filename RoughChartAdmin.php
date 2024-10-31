<?php

require_once( 'views/View.php' );
require_once( 'services/Translations.php' );

use roughChart\models\DB;
use roughChart\models\ErrorMsg;
use roughChart\views\View;
use roughChart\services\Translations;

/**
 * Class RoughChartAdmin
 */
class RoughChartAdmin {
    private static $initiated = false;

    public static $menu_slug = 'rough_chart';
    public static $js_slug = 'rough-charts-app';

    public static function init() {
        if ( ! self::$initiated ) {
            self::init_hooks();
        }
    }

    public static function init_hooks() {
        self::$initiated = true;

        // --> Add action hooks
        add_action( 'admin_menu', array( 'RoughChartAdmin', 'admin_menu' ) );
        add_action( 'admin_enqueue_scripts', array( 'RoughChartAdmin', 'add_js_scripts' ) );
        add_action( 'wp_ajax_rough_chart_add_new_chart', array( 'RoughChartAdmin', 'add_new_chart' ) );
        add_action( 'wp_ajax_rough_chart_update_chart', array( 'RoughChartAdmin', 'update_chart' ) );
        add_action( 'wp_ajax_rough_chart_get_all_charts', array( 'RoughChartAdmin', 'get_all_charts' ) );
        add_action( 'wp_ajax_rough_chart_get_chart_by_id', array( 'RoughChartAdmin', 'get_chart_by_id' ) );
        add_action( 'wp_ajax_rough_chart_delete_chart', array( 'RoughChartAdmin', 'delete_chart' ) );

        // --> Add filter hooks
        add_filter( 'plugin_action_links_' . ROUGH_CHART_BASENAME, array( 'RoughChartAdmin', 'add_plugin_page_settings_link' ) );
    }

    public static function admin_menu() {
        // https://developer.wordpress.org/plugins/administration-menus/sub-menus/
        add_submenu_page(
            'themes.php',
            'Rough Charts',
            'Rough Charts',
            'manage_options',
            RoughChartAdmin::$menu_slug,
            array( 'RoughChartAdmin', 'render_admin_view' )
        );
    }

    public static function add_js_scripts() {
        $build_folder = plugin_dir_url( __FILE__ ) . 'app/build/';
        wp_enqueue_script(
            self::$js_slug,
            $build_folder . 'js/rough-chart.js',
            array(),
            ROUGH_CHART_VERSION
        );
        wp_localize_script(
            self::$js_slug,
            '__roughChartsApp_$8453',
            array(
                'nonce' => wp_create_nonce( self::$js_slug ),
                'ajax_url' => admin_url( 'admin-ajax.php' ),
                'plugin_url' => menu_page_url( self::$menu_slug, false ),
                'build_folder' => $build_folder,
                'i18n' => Translations::getTranslations(),
            )
        );
    }

    /**
     * Adds custom links to the plugin in the plugin overview page.
     *
     * @param array  $links Array of links for the plugins, adapted when the current plugin is found.
     *
     * @return array $links
     */
    public static function add_plugin_page_settings_link( $links ) {
        $settings_link = '<a href="' .
                   admin_url( 'themes.php?page=' . RoughChartAdmin::$menu_slug ) .
                   '">' . __( 'Settings', View::$text_domain ) . '</a>';
        array_unshift( $links, $settings_link );
        return $links;
    }

    /**
     * `add_new_chart` - ajax call
     * This method will process the request for creating a new chart.
     */
    public static function add_new_chart() {
        $err = null;
        try {
            $chart = json_decode(
                stripcslashes( $_POST[ 'chart' ] ),
                true,
                512
            );
            if ($chart == null) {
                throw new Exception('Chart data can\'t be parsed');
            }
            $title = isset( $chart[ 'title' ] ) ? $chart[ 'title' ] : null;
            $chart_type = isset( $chart[ 'chart_type' ] ) ? $chart[ 'chart_type' ] : null;
            $result = DB::add_chart(
                $title,
                $chart_type,
                json_encode( $chart[ 'chart' ] )
            );
            if ( $result[ 'inserted_rows' ] == 1 ) {
                wp_send_json( $result );
            } else {
                $err = ErrorMsg::generalDBError();
            }
        } catch ( Exception $e ) {
            $err = ErrorMsg::generalError( $e );
        }
        if ( $err != null ) {
            wp_send_json(
                $err->toArray(),
                $err->getStatus()
            );
        }
        die();
    }

    /**
     * `update_chart` - ajax call
     * This method will process the request for updating existing chart.
     */
    public static function update_chart() {
        $chart_id = intval( $_POST[ 'chart_id' ] );
        $err = null;
        try {
            $chart = json_decode(
                stripcslashes( $_POST[ 'chart' ] ),
                true,
                512,
                JSON_THROW_ON_ERROR
            );
            $title = isset( $chart[ 'title' ] ) ? $chart[ 'title' ] : null;
            $result = DB::update_chart(
                $chart_id,
                $title,
                json_encode( $chart[ 'chart' ] )
            );
            if ( $result[ 'updated_rows' ] == 1 ) {
                $updated_chart = DB::get_chart_by_id( $chart_id );
                wp_send_json( $updated_chart );
            } else {
                $err = ErrorMsg::generalDBError();
            }
        } catch ( Exception $e ) {
            $err = ErrorMsg::generalError( $e );
        }
        if ( $err != null ) {
            wp_send_json(
                $err->toArray(),
                $err->getStatus()
            );
        }
        die();
    }

    /**
     * `get_all_charts` - ajax call
     * This method will process the request for retrieving all charts.
     */
    public static function get_all_charts() {
        $result = DB::get_all_charts();
        wp_send_json( $result );
        die();
    }

    /**
     * `get_chart_by_id` - ajax call
     * This method will process the request for retrieving chart by its id.
     */
    public static function get_chart_by_id() {
        $chart_id = intval( $_POST[ 'chart_id' ] );
        $result = DB::get_chart_by_id( $chart_id );
        wp_send_json( $result );
        die();
    }

    /**
     * `delete_chart` - ajax call
     * This method will process the request for deleting chart by its id.
     */
    public static function delete_chart() {
        $err = null;
        $chart_id = intval( $_POST[ 'chart_id' ] );
        $result = DB::delete_chart_by_id( $chart_id );
        if ( $result == 1 ) {
            wp_send_json( json_decode( $result ) );
        } else {
            $err = ErrorMsg::generalDBError();
        }
        if ( $err != null ) {
            wp_send_json(
                $err->toArray(),
                $err->getStatus()
            );
        }
        die();
    }

    public static function render_admin_view() {
        $view = new View();
        $view->render();
    }

}
