<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\BlogController;




/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// ==========HOME ROUTE===========//
Route::get('/',[HomeController::class, 'index'])->name("home.index");



// ==========RESUME ROUTE===========//
Route::get('/resume',[ResumeController::class, 'index'])->name("resume.index");

// ==========ABOUT US ROUTE===========//
Route::get('/about',[AboutController::class, 'index'])->name("about.index");

// ==========CONTACT ROUTE===========//
Route::post('/contact',[ContactController::class, 'index'])->name("contact.index");


// ==========BLOG ROUTE===========//
Route::get('/blog',[BlogController::class, 'index'])->name("blog.index");







