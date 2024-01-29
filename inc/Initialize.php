<?php

namespace BrandyBlocks;

use BrandyBlocks\Packages\PackagesLoader;

class Initialize {
    use \BrandyBlocks\Traits\SingletonTrait;

    protected function __construct() {
        PackagesLoader::get_instance();
    }
}