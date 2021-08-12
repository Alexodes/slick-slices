/*eslint-disable*/
import {useEffect, useState} from "react";


export default function useLatestData() {
    const [hotSlices, setHotSlices] = useState();
    const [slicemasters, setSlicemasters] = useState();
    useEffect(function (){
        fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query {
                        StoreSettings(id: "downtown") {
                            name
                            slicemasters {
                                name
                                _id
                                image {
                                    asset {
                                        url
                                        metadata {
                                            lqip
                                        }
                                    }
                                }
                            }
                            hotSlices {
                                name
                                _id
                                image {
                                    asset {
                                        url
                                        metadata {
                                            lqip
                                        }
                                    }
                                }
                            }
                        }
                    }
                `,
            })
        })
            .then(res => res.json())
            .then(res => {
                setHotSlices(res.data.StoreSettings.hotSlices);
                setSlicemasters(res.data.StoreSettings.slicemasters);
            })
    }, []);
    return {
        hotSlices,
        slicemasters
    }
}
