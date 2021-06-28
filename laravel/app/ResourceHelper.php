<?php

namespace App;

class ResourceHelper
{
    static public function paginate($query, $item)
    {
        $pagination = $query->paginate($item, null, 'halaman')->jsonSerialize();
        return [
            'data' => $pagination['data'],
            'item_from' => $pagination['from'] ? $pagination['from'] : 0,
            'item_to' => $pagination['to'] ? $pagination['to'] : 0,
            'item_total' => $pagination['total'],
            'page_current' => $pagination['current_page'],
            'page_total' => $pagination['last_page']
        ];
    }
}
