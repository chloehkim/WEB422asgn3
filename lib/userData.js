import { getToken } from '@/lib/authenticate'

export async function addToFavourites(siteId){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/favourites/${siteId}`, {
    method: "PUT",
    // body: JSON.stringify({ userName: user, password: password }),
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${getToken()}`
    }
  });

//   const data = await res.json();

  if(res.status === 200){
    return await res.json();
  }else {
    return [];
  }
}

export async function removeFromFavourites(siteId){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/favourites/${siteId}`, {
    method: "DELETE",
    // body: JSON.stringify({ userName: user, password: password }),
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${getToken()}`,
    }
  });

//   const data = await res.json();

  if(res.status === 200){
      return await res.json();
  }else{
    return [];
  }
}

export async function getFavourites(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/favourites`, {
    method: "GET",
    // body: JSON.stringify({ userName: user, password: password }),
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${getToken()}`
    }
  });

//   const data = await res.json();

  if(res.status === 200){
       return await res.json();
  }else{
    return [];
  }
}

