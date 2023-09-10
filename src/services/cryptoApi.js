import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";        //toolkit se import kiya ye createapi module name


export const cryptoApi = createApi({                        // export kar diya cryptoapi function ko using createApi module
  reducerPath: "cryptoApi",                                  // unique hona chahiye reducer path kyuki ye multiple ho sakte hain, aur ise store me set karenge
  baseQuery: fetchBaseQuery({
    baseUrl: "https://coinranking1.p.rapidapi.com",          //yahan base url aur header dalenge
    prepareHeaders: (header) => {
      header.set("x-rapidapi-host", "coinranking1.p.rapidapi.com");
      header.set("x-rapidapi-key", 'cb87c84102mshb305a2fd24bc280p165c12jsn2449e3389fa6');
      return header;
    },
  }),
  endpoints: (builder) => ({                                 //yahan is function me endpoint dalega, builder bas argument hai uski jagah kuch bhi ho sakta hai

    // query to fetch coin detail for certain number of coins
    getCryptos: builder.query({
      query: (count) => `/coins?limit=${count}`,
    }),

    // query to fetch data of a particular coin corresponding to its id
    getCryptosDetail: builder.query({
      query: (uuid) => `/coin/${uuid}`,
    }),

    // query to fetch the history of the coin upto a certain timeframe
    getCryptosHistory: builder.query({
      query: (args) => {
        const {id, time} = args;
        console.log(id ,time)
        return {
          url: `coin/${id}/history?timeperiod=${time}`
        }
      }
      
    }),

  }),
});
export const { useGetCryptosQuery, useGetCryptosDetailQuery, useGetExchangesQuery, useGetCryptosHistoryQuery } = cryptoApi;