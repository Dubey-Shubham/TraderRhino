import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cryptonewsApi = createApi({         // export kar diya cryptoapi function ko using createApi module
    reducerPath: 'cryptonewsApi',                // unique hona chahiye educer path kyuki ye multiple ho sakte hain
    baseQuery: fetchBaseQuery({ baseUrl: 'https://bing-news-search1.p.rapidapi.com'}),        //base query me jo bhi query hai wo daalni padegi along with baseurl without any endpoint
    endpoints: (builder) => ({                                           //yahan is function me endpoint dalega, builder bas argument hai uski jagah kuch bhi ho sakta hai
        getCryptosnews: builder.query({                       //getcryptos naam ki query banai
          query: ({ newsCategory, count }) => ({                                   // query me sabhi endpoint daal diye
            url:`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,   //category aur number of articles ham component me mention kar denge
            method: 'GET',
            headers: {
                'X-BingApis-SDK': 'true',
                'X-RapidAPI-Key': 'cb87c84102mshb305a2fd24bc280p165c12jsn2449e3389fa6',
                'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
              }
          })
        })
    })
})

export const {
    useGetCryptosnewsQuery,
  } = cryptonewsApi;