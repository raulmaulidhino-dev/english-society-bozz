<script>
    import Login from './Login.svelte';
    import { goto } from '$app/navigation';
    import { isLoggedIn } from '../../stores/auth.js';

    if ($isLoggedIn) goto('/user/profile');

</script>

<Login />