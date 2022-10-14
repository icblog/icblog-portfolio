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
use App\Http\Controllers\PingController;


use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminPostController;
use App\Http\Controllers\AdminCategoryController;





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
// ==========PING ROUTE===========//
Route::get('/check-site',[PingController::class, 'index']);
Route::post('/check-site',[PingController::class, 'index']);

// ==========HOME ROUTE===========//
Route::get('/',[HomeController::class, 'index'])->name("home.index");

// ==========LOGIN ROUTE===========//
Route::get('/login',[LoginController::class, 'index'])->name("login.index")->middleware('isAlreadyLoggedIn');
Route::post('/handle-login-form',[LoginController::class, 'handleLoginForm'])->name("login.handleLoginForm");

// ==========LOGOUT ROUTE===========//
Route::post('/logout',[LogOutController::class, 'index'])->name("logout.index");

// ==========REGISTER ROUTE===========//
Route::get('/register',[RegisterController::class, 'index'])->name("register.index")->middleware('isAlreadyLoggedIn');
Route::get('/complete-register',[RegisterController::class, 'showCompleteRegisterForm'])->name("register.showCompleteRegisterForm")->middleware('isAlreadyLoggedIn');
Route::post('/handle-initial-register',[RegisterController::class, 'handleInitialRegister'])->name("register.initialRegister");
Route::post('/store-complete-register',[RegisterController::class, 'store'])->name("register.store");

// ==========FORGOTTEN PASS ROUTE===========//
Route::get('/forgotten-pass',[ForgottenPassController::class, 'index'])->name("forgottenPass.index")->middleware('isAlreadyLoggedIn');
Route::post('/handle-forgottenpass-form',[ForgottenPassController::class, 'handleForgottenPassForm'])->name("forgottenPass.handleForgottenPassForm");

// ==========RESET PASS ROUTE===========//
Route::get('/reset-pass/{token}',[ResetPassController::class, 'index'])->name("resetPass.index")->middleware('isAlreadyLoggedIn');
Route::post('/reset-pass-update',[ResetPassController::class, 'update'])->name("resetPass.update");

// ==========VERIFY ROUTE===========//

Route::get('/verify/{tk}/{action}',[VerifyController::class, 'index'])->name("verify.index")->middleware('isAlreadyLoggedIn');
Route::post('/verify-token',[VerifyController::class, 'verifyToken'])->name("verify.verifyToken");

// ==========RESUME ROUTE===========//
Route::get('/resume',[ResumeController::class, 'index'])->name("resume.index");

// ==========ABOUT US ROUTE===========//
Route::get('/about',[AboutController::class, 'index'])->name("about.index");

// ==========CONTACT ROUTE===========//
Route::post('/contact',[ContactController::class, 'index'])->name("contact.index");


// ==========BLOG ROUTE===========//
Route::get('/blog/{action}/{slug}',[BlogController::class, 'index'])->name("blog.index");
Route::get('/blog',[BlogController::class, 'redirectToBlogHome']);
Route::get('/blog/post',[BlogController::class, 'redirectToBlogHome']);
Route::get('/blog/{postSlug}',[BlogController::class, 'show'])->name("blog.show");
Route::post('/blog/search',[BlogController::class, 'search'])->name("blog.search");









// ==========ADMIN ROUTE===========//

Route::get('/admin',[AdminDashboardController::class, 'index'])->name("admin.dashboard")->middleware('isAdmin');
Route::get('/admin/dashboard',[AdminDashboardController::class, 'index'])->name("admin.dashboard")->middleware('isAdmin');

Route::get('/admin/addpost',[AdminPostController::class, 'showAddPostIndex'])->name("admin.addpost")->middleware('isAdmin');
Route::get('/admin/allpost',[AdminPostController::class, 'showAllpostIndex'])->name("admin.allpost")->middleware('isAdmin');
Route::get('/admin/editpost/{postId}',[AdminPostController::class, 'showEditPostIndex'])->name("admin.editPostIndex")->middleware('isAdmin');
Route::post('/admin/storepost',[AdminPostController::class, 'store'])->name("admin.storepost")->middleware('isAdmin');
Route::post('/admin/updatepost',[AdminPostController::class, 'update'])->name("admin.updatepost")->middleware('isAdmin');
Route::post('/admin/loadmorepost',[AdminPostController::class, 'loadMorePostDataAjax'])->name("admin.loadmorepost")->middleware('isAdmin');
Route::post('/admin/deletepost',[AdminPostController::class, 'delete'])->name("admin.deletepost")->middleware('isAdmin');



Route::get('/admin/category',[AdminCategoryController::class, 'index'])->name("admin.category")->middleware('isAdmin');
Route::post('/admin/storecategory',[AdminCategoryController::class, 'store'])->name("admin.storecategory")->middleware('isAdmin');
Route::post('/admin/updatecategory',[AdminCategoryController::class, 'update'])->name("admin.updatecategory")->middleware('isAdmin');
Route::post('/admin/deletecategory',[AdminCategoryController::class, 'delete'])->name("admin.deletecategory")->middleware('isAdmin');
Route::post('/admin/loadmorecategory',[AdminCategoryController::class, 'loadMoreCategoryDataAjax'])->name("admin.loadmorecategory")->middleware('isAdmin');
