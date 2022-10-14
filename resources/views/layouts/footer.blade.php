<footer>
     <div class="container">
       <div class="row">
       <div class="col-md-12">
       <hr/>
         <div class="back-to-top-btn-wrapper text-right">
             <button class="back-to-top-btn primary-btn"><i class="fa fa-arrow-up"></i></button>
         </div>
        
          <p class="text-center">icblog. @ 2022</p>
      </div>
     </div>
    </div>
</footer>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
<script>
    //AJAX TOKEN SETTINGS
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    //ROUTE NAMES

    let routes = {

        'registerIndex': '{{ route('register.index') }}',
        'initialRegister': '{{ route('register.initialRegister') }}',
        'showCompleteRegisterForm': '{{ route('register.showCompleteRegisterForm') }}',
        'storeCompleteRegister': '{{ route('register.store') }}',
        'loginIndex': '{{ route('login.index') }}',
        'handleLoginForm': '{{ route('login.handleLoginForm') }}',
        'forgottenPass': '{{ route('forgottenPass.index') }}',
        'handleForgottenPassForm': '{{ route('forgottenPass.handleForgottenPassForm') }}',
        'resetPassUpdate': '{{ route('resetPass.update') }}',
        'homeIndex': '{{ route('home.index') }}',
        'verifyToken': '{{ route('verify.verifyToken') }}',
        'contactIndex': '{{ route('contact.index') }}',
        'blogIndex': '{{ URL::route('blog.index', ['post','latest']) }}',
        'logoutIndex': '{{ route('logout.index') }}',
        'blogSearch':'{{ route('blog.search') }}',
        
        //ADMIN ROUTES
        'adminStoreCategory': '{{ route('admin.storecategory') }}',
        'adminUpdateCategory': '{{ route('admin.updatecategory') }}',
        'adminDeleteCategory': '{{ route('admin.deletecategory') }}',
        'adminLoadmoreCategory': '{{ route('admin.loadmorecategory') }}',
        'adminStorepost': '{{ route('admin.storepost') }}',
        'adminUpdatepost': '{{ route('admin.updatepost') }}',
        'adminDeletepost': '{{ route('admin.deletepost') }}',
        'adminLoadMorePost': '{{ route('admin.loadmorepost') }}',
        
        
        
        
 };

</script>
    <!-- ADD SCRIPT FOR POST PLUG INS CSS -->
    @if(Route::currentRouteName() == "admin.addpost" || Route::currentRouteName() == "admin.editPostIndex")
    <script src="{{ asset('js/easySelect.js') }}"></script>
    <script src="{{ asset('js/image-uploader.min.js') }}"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
    <script src="https://inacho.github.io/bootstrap-markdown-editor/dist/js/bootstrap-markdown-editor.js"></script>
    @endif

    @if(App::environment(['local', 'staging']))
       <script src="{{ asset('js/app.js?v='.rand(1,99)) }}"></script>
    @else
    <script src="{{ asset('js/app.js') }}"></script>
    @endif
</body>
</html>
