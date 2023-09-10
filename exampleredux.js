import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';    //toolkit se import kiya ye createapi module name 

export const cryptoApi = createApi({         // export kar diya cryptoapi function ko using createApi module
  reducerPath: 'cryptoApi',                // unique hona chahiye reducer path kyuki ye multiple ho sakte hain, aur ise store me set karenge
  baseQuery: fetchBaseQuery({ baseUrl: 'https://coinranking1.p.rapidapi.com' }),        //base query me jo bhi query hai wo daalni padegi along with baseurl without any endpoint
  endpoints: (builder) => ({                                           //yahan is function me endpoint dalega, builder bas argument hai uski jagah kuch bhi ho sakta hai
    getCryptos: builder.query({                       //getcryptos naam ki query banai
      query: (count) => ({                                   // query me sabhi endpoint daal diye
        url: `/coins?limit=${count}`,                       // limit me ek number daal diya jitne articles hamko chahiye hain
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'cb87c84102mshb305a2fd24bc280p165c12jsn2449e3389fa6',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      })
    }),

    getCryptosDetail: builder.query({                       // new query banai
      query: (uuid) => ({                                   // us coin ki uuid daal denge jiski detail chahiye
        url: `/coin/${uuid}`,
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'cb87c84102mshb305a2fd24bc280p165c12jsn2449e3389fa6',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      })
    }),

    getCryptosHistory: builder.query({                       // new query banai
      query: (args) => ({                                   // us coin ki uuid daal denge jiski detail chahiye
        url: `/coin?referenceCurrencyUuid=${args.id}&timePeriod=${args.period}`,
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'cb87c84102mshb305a2fd24bc280p165c12jsn2449e3389fa6',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        },
      })
    })
  })
})

export const {
  useGetCryptosQuery,
  useGetCryptosDetailQuery,
  useGetCryptosHistoryQuery,

} = cryptoApi;




