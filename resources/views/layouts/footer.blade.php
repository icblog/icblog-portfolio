<footer>
    <p>@copyright 2022</p>
</footer>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
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
        'blogIndex': '{{ route('blog.index') }}',
        'logoutIndex': '{{ route('logout.index') }}'
   };

</script>
<script src="{{ asset('js/image-uploader.min.js?v='.rand(1,99)) }}"></script>
<script src="{{ asset('js/jsRapStar.js?v='.rand(1,99)) }}"></script>
<script src="{{ asset('js/app.js?v='.rand(1,99)) }}"></script>

</body>

</html>
