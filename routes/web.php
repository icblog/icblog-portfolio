<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VerifyController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminWorkController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\AboutController;


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

// ==========AUTH ROUTE===========//

Route::post('/index',[AuthController::class, 'index'])->name("auth.index");

Route::post('/complete-register',[AuthController::class, 'store'])->name("auth.store");

Route::post('/login',[AuthController::class, 'login'])->name("auth.login");
Route::post('/logout',[AuthController::class, 'logout'])->name("auth.logout");

Route::post('/update',[AuthController::class, 'update'])->name("auth.update");


// ==========VERIFY ROUTE===========//

Route::get('/verify/{tk}/{action}',[VerifyController::class, 'index'])->name("verify.index");
Route::post('/verify-token',[VerifyController::class, 'verifyToken'])->name("verify.verifyToken");

// ==========WORK ROUTE===========//
Route::get('/work',[WorkController::class, 'index'])->name("work.index");

// ==========ABOUT US ROUTE===========//
Route::get('/about',[AboutController::class, 'index'])->name("about.index");


// ==========REVIEW ROUTE===========//
Route::get('/reviews',[ReviewController::class, 'index'])->name("review.index");
Route::post('/user/store-review',[ReviewController::class, 'userStore'])->name("review.userStore")->middleware('auth');

Route::post('/user/check-review',[ReviewController::class, 'checkUserReview'])->name("review.checkUserReview")->middleware('auth');


// ==========ADMIN ROUTE===========//
Route::get('/admin/dashboard',[AdminDashboardController::class, 'index'])->name("admin.index")->middleware('a_admin');

Route::get('/admin/all-work',[AdminWorkController::class, 'index'])->name("admin.allwork")->middleware('a_admin');

Route::get('/admin/add-work',[AdminWorkController::class, 'addWork'])->name("admin.addwork")->middleware('a_admin');

Route::post('/admin/store',[AdminWorkController::class, 'store'])->name("admin.store")->middleware('a_admin');

Route::post('/admin/delete-work',[AdminWorkController::class, 'deleteWork'])->name("admin.deleteWork")->middleware('a_admin');




