<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Post;
use App\Models\Category;


class BlogController extends BaseController{
    private $strLimit = 25;
    private $resultPerPage = 8;

    public function redirectToBlogHome(){
        return redirect()->route('blog.index', ['post','latest']);
    }
    public function index(Request $request){
         //Fetch latest 6 post and pass to home view
         $latestPostResult = Post::fetchLatestPost($this->resultPerPage, true);
         // dd($latestPostResult['postResult']);
         $popularPost = Post::fetchPopularPost($this->resultPerPage, true);
         //Fetch all categories
         $categoriesResult = Category::fetchCategoriesWithCount();
         
        $pageIntro = "latest";
        $noResultMsg = "There are no <strong>latest</strong> post, please check back soon";
        $mainResult  = array();
        

        if($request->action == "post" && $request->slug  == "latest"){
            $mainResult  = $latestPostResult['postResult'];
        }elseif($request->action == "post" && $request->slug  == "popular"){
            $mainResult  = $popularPost['postResult'];
            $pageIntro = "popular";
            $noResultMsg = "There are no <strong>popular</strong> post, please check back soon";
        }elseif($request->action == "category"){
            $catgoryPostResult = Post::fetchPostWithCategorySlug($this->resultPerPage,$request->slug);
            $mainResult = $catgoryPostResult['postResult'];
            $pageIntro = "category: ".Str::replace('-', ' ', $request->slug);
            $noResultMsg = "There are no post in category <strong>".Str::replace('-', ' ', $request->slug)."</strong>, please check back soon";
        }else{
            return redirect()->route('home.index');  
        }
         // set array data for the view
        $dataToView = array(
            "pageIntro"=> $pageIntro,
            "urlSlug"=>$request->slug,
            "latestPostResult"=> $latestPostResult['postResult'],
            "popularPost"=> $popularPost['postResult'],
            "categoriesResult"=> $categoriesResult["result"],
            "mainResult"=>$mainResult,
            "noResultMsg"=>$noResultMsg,
            "strLimit"=>$this->strLimit,
            "requestAction"=>$request->action,
            "requestSlug"=>$request->slug,
         );

         //Delete and store current url in session
         $request->session()->forget('blogResultUrl');
         $request->session()->put('blogResultUrl', $request->getRequestUri());

        //Pass in data to view and return it
        return view('/blog.index', $dataToView);
        
    }

    public function show(Request $request){

        $isAdmin = false;
        $whereColumn = "slug";
        $equalToValue = $request->postSlug;
        $defaultUrl = route("blog.index",["post","latest"],false);//route name
        $backUrl = $request->session()->pull('blogResultUrl', $defaultUrl);
        //dd($defaultUrl);
       
         $dataToView = array(
            "singlePostResult"=>"",
            "latestPostResult"=> "",
            "popularPost"=> "",
            "urlSlug"=>"",
            "categoriesResult"=> "",
            "pageTitle" => "Post not found",
            "strLimit" => $this->strLimit,
            "backUrl" => $backUrl,
            "requestSlug" => "",
            "nextPostResult" => "",
            "previousPostResult" => "",
         );
          //Fetch latest 6 post and pass to home view
          $latestPostResult = Post::fetchLatestPost();
          $popularPost = Post::fetchPopularPost();
          //Fetch all categories
          $categoriesResult = Category::fetchCategoriesWithCount();

        $singlePostResult = Post::fetchSinglePost($isAdmin, $whereColumn, $equalToValue);
       //dd($singlePostResult["postResult"]);
          //If no error and we have post result update the post views column in db 
           if(!$singlePostResult["error"] && $singlePostResult["postResult"] != ""){
              Post::where('slug', $equalToValue)->update(['views' => $singlePostResult["postResult"]->views+1]);   
              $dataToView["singlePostResult"] = $singlePostResult["postResult"];
              $dataToView["pageTitle"] = $singlePostResult["postResult"]->title;
              $singlePostResult["postResult"]->catSlugs =   explode(",",$singlePostResult["postResult"]->catSlugs);
              $singlePostResult["postResult"]->catNames = explode(",",$singlePostResult["postResult"]->catNames);
              
              //Fetch next and previous post
              $nextPostResult = Post::fetchNextOrPreviousPost($singlePostResult["postResult"]->id,"next");
              $previousPostResult = Post::fetchNextOrPreviousPost($singlePostResult["postResult"]->id,"previous");
               if($nextPostResult["postResult"] != null){
                $dataToView["nextPostResult"] = $nextPostResult["postResult"];
                }

                 if($previousPostResult["postResult"] != null){
                    $dataToView["previousPostResult"] = $previousPostResult["postResult"];
                }
             
              }//end  !$singlePostResult


            if(!$latestPostResult["error"] && $latestPostResult["postResult"] != ""){
                $dataToView["latestPostResult"] = $latestPostResult['postResult'];
            }

            if(!$popularPost["error"] && $popularPost["postResult"] != ""){
                $dataToView["popularPost"] = $popularPost['postResult'];
            }

            if(!empty($categoriesResult["result"])){
                $dataToView["categoriesResult"] = $categoriesResult["result"];
            }
            
          return view('/blog.show-single-blog',$dataToView);
      
      }
}
