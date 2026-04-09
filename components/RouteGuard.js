import { useAtom } from 'jotai';
import { favoritesAtom } from '@/store';
import { getFavourites } from '@/lib/userData';
import { isAuthenticated } from '@/lib/authenticate';
import { useState, useEffect } from "react";
import { useRouter} from 'next/router';

export default function RouteGuard(props) {

    const [ authorized, setAuthorized] = useState(false);
    const [favouritesList, setFavouritesList] = useAtom(favoritesAtom);
    const router = useRouter();
    const PUBLIC_PATHS = ['/register', '/about'];

    useEffect(()=>{
        updateAtom();
        authCheck(router.pathname);
    },[router.pathname]);

      async function updateAtom(){
        setFavouritesList(await getFavourites());
    }

    async function authCheck(url) {
    const path = url.split('?')[0];

    await updateAtom(); 

    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
       setAuthorized(false);
       router.push('/login');
    } else {
        setAuthorized(true);
    }
    }


  return <>{props.children}</>
}