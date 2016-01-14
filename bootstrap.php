<?php namespace Matpompili\Imgur\Upload;

/*
* This file is part of imgur-upload.
*
* (c) Matteo Pompili <matpompili@gmail.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

use Flarum\Event\ConfigureClientView;
use Illuminate\Contracts\Events\Dispatcher;

return function(Dispatcher $events) {
    $events->listen(ConfigureClientView::class, function(ConfigureClientView $event){
        $event->addAssets(__DIR__.'/js/lib/string.js');
    });
};
