<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ForgottenPassController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LogOutController;
use App\Http\Controllers\VerifyController;
use App\Http\Controllers\ResetPassController;
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

// ==========LOGIN ROUTE===========//
Route::get('/login',[LoginController::class, 'index'])->name("login.index");
Route::post('/handle-login-form',[LoginController::class, 'handleLoginForm'])->name("login.handleLoginForm");

// ==========LOGOUT ROUTE===========//
Route::post('/logout',[LogOutController::class, 'index'])->name("logout.index");

// ==========REGISTER ROUTE===========//
Route::get('/register',[RegisterController::class, 'index'])->name("register.index");
Route::get('/complete-register',[RegisterController::class, 'showCompleteRegisterForm'])->name("register.showCompleteRegisterForm");
Route::post('/handle-initial-register',[RegisterController::class, 'handleInitialRegister'])->name("register.initialRegister");
Route::post('/store-complete-register',[RegisterController::class, 'store'])->name("register.store");

// ==========FORGOTTEN PASS ROUTE===========//
Route::get('/forgotten-pass',[ForgottenPassController::class, 'index'])->name("forgottenPass.index");
Route::post('/handle-forgottenpass-form',[ForgottenPassController::class, 'handleForgottenPassForm'])->name("forgottenPass.handleForgottenPassForm");

// ==========RESET PASS ROUTE===========//
Route::get('/reset-pass/{token}',[ResetPassController::class, 'index'])->name("resetPass.index");
Route::post('/reset-pass-update',[ResetPassController::class, 'update'])->name("resetPass.update");

// ==========VERIFY ROUTE===========//

Route::get('/verify/{tk}/{action}',[VerifyController::class, 'index'])->name("verify.index");
Route::post('/verify-token',[VerifyController::class, 'verifyToken'])->name("verify.verifyToken");

// ==========RESUME ROUTE===========//
Route::get('/resume',[ResumeController::class, 'index'])->name("resume.index");

// ==========ABOUT US ROUTE===========//
Route::get('/about',[AboutController::class, 'index'])->name("about.index");

// ==========CONTACT ROUTE===========//
Route::post('/contact',[ContactController::class, 'index'])->name("contact.index");


// ==========BLOG ROUTE===========//
Route::get('/blog',[BlogController::class, 'index'])->name("blog.index");
