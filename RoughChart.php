<?php

require_once( 'models/DB.php' );
require_once( 'models/ErrorMsg.php' );
require_once( 'services/Utils.php' );
require_once( 'views/ShortcodeView.php' );
require_once( 'views/View.php' );

use roughChart\models\DB;
use roughChart\models\ErrorMsg;
use roughChart\services\Utils;
use roughChart\views\ShortcodeView;
use roughChart\views\View;

/**
 * Class RoughChart
 */
class RoughChart {
    private static $initiated = false;

    public static $js_slug = 'rough-charts-app';

    public static function init() {
        if ( ! self::$initiated ) {
            self::init_hooks();
        }
    }

    private static function init_hooks() {
        self::$initiated = true;

        add_shortcode( 'roughchart', array( 'RoughChart', 'shortcode_roughchart' ) );
        add_action( 'wp_enqueue_scripts', array( 'RoughChart', 'add_js_scripts' ) );
        add_action( 'rest_api_init', array( 'RoughChart', 'register_rest_routes' ) );
    }

    public static function shortcode_roughchart( $atts ) {
        $chart_ref = shortcode_atts( array(
            'id' => -1,
            'title' => '',
        ), $atts );

        $shortcode_view = new ShortcodeView(
            $chart_ref['id'],
            $chart_ref['title']
        );

        return $shortcode_view -> render();
    }

    public static function add_js_scripts() {
        $build_folder = plugin_dir_url( __FILE__ ) . 'app/build/';
        wp_enqueue_script(
            self::$js_slug,
            $build_folder . 'js/rough-chart-shortcode.js',
            array(),
            ROUGH_CHART_VERSION
        );
        wp_localize_script(
            self::$js_slug,
            '__roughChartsApp_$8453',
            array(
                'rest_api_url' => get_site_url() . '/wp-json/rough-chart/v1',
            )
        );
    }

    public static function register_rest_routes() {
        register_rest_route(
            'rough-chart/v1',
            '/chart/(?P<id>\d+).tsv',
            array(
                'methods' => 'GET',
                'callback' => array( 'RoughChart', 'rest_api_get_chart_tsv' ),
            )
        );
    }

    public static function rest_api_get_chart_tsv( $data ) {
        $err = null;
        if ( !isset( $data[ 'id' ] ) ) {
            $err = ErrorMsg::generalError(
                new \Exception( __( 'ID is not provided', View::$text_domain ) )
            );
        }
        if ( $err != null ) {
            $response = new WP_REST_Response( $err->toArray() );
            $response->set_status( $err->getStatus() );
            return $response;
        }
        $chart_data = DB::get_chart_by_id( $data[ 'id' ] );
        $decoded_chart = json_decode( $chart_data->chart );

        // Only this way I can response with text file, that will have EOL characters.
        // And these characters will be rendered as actually new lines and not "\r\n"
        header('Content-Type: text/plain; charset=utf-8');
        echo Utils::chartDataToTsv( $decoded_chart->data );
        die();
    }

    public static function plugin_activation() {
        DB::init_table();
    }

    public static function plugin_deactivation() {
        DB::drop_table();
    }
}
