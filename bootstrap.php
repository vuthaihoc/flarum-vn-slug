<?php

use Flarum\Event\ConfigureClientView;
use Flarum\Event\DiscussionWillBeSaved;
use Illuminate\Contracts\Events\Dispatcher;

return function(Dispatcher $events) {
    $events->listen(ConfigureClientView::class, function(ConfigureClientView $event){
        $event->addAssets(__DIR__.'/js/lib/string.js');
    });

    $events->listen(DiscussionWillBeSaved::class, function(DiscussionWillBeSaved $event){

        $text = $event->discussion->title;

//        $slugtify = new \Cocur\Slugify\Slugify();
//        $text = $slugtify->slugify($text);

        $text = \VuThaiHoc\FlarumVnSlug\Utils::genSlug($text);

        $event->discussion->slug = $text;

    });
};
