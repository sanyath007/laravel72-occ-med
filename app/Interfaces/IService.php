<?php

namespace App\Interfaces;

interface IService
{
    public function find($id);

    public function findAll($params = []);

    public function findById($id);

    public function initForm();

    public function delete($id);

    public function updateImage($id, $image);
}