<?php

namespace roughChart\services;

class Utils {
    public static function chartDataToTsv( $chart_data ) {
        $chart_arr = [];
        $chart_data_max_length = 0;
        foreach ( $chart_data as $key => $item ) {
            $new_column = array_merge(
                [ $key ],
                $item
            );
            // I'm not sure that all chart columns will have the same length
            $chart_data_max_length = max( $chart_data_max_length, count( $new_column ) );
            array_push(
                $chart_arr,
                $new_column
            );
        }
        $result = [];
        for ( $row_id = 0; $row_id < $chart_data_max_length; $row_id++ ) {
            $row = [];
            for ( $col_id = 0; $col_id < count( $chart_arr ); $col_id++ ) {
                $next_item = '';
                if ( isset( $chart_arr[ $col_id ][ $row_id ] ) ) {
                    $next_item = $chart_arr[ $col_id ][ $row_id ];
                }
                array_push(
                    $row,
                    $next_item
                );
            }
            array_push(
                $result,
                implode( "\t", $row )
            );
        }
        return implode( PHP_EOL, $result );
    }
}
