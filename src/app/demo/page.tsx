"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { useAuth } from "@clerk/nextjs";

const DemoPage = () => {
    const {userId} = useAuth();
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const handelBlocking = async () => {
        setLoading(true);
        await fetch("/api/demo/blocking",
            {method : "POST"}
        );
        setLoading(false);
    } 

    const handelBackground = async () => {
        setLoading2(true);
        await fetch("/api/demo/background",
            {method : "POST"}
        );
        setLoading2(false);
    } 

    const handelClientError = () => {
        Sentry.logger.info("user attempted to trigger a client error", {
            userId
        });
        throw new Error("Client error : something went wrong on the browser");
    };

    const handelApiError = async () => {
        await fetch("/api/demo/error",
            {method : "POST"}
        );
    };

    const handelInngestError = async () => {
        await fetch("/api/demo/inngest-error",
            {method : "POST"}
        );
    };
    return (  
        <div className="p-8 space-x-4">
        <Button disabled={loading} onClick={handelBlocking}>
            {
                loading ? "Loading..." : "blocking"
            }
        </Button>

         <Button disabled={loading2} onClick={handelBackground}>
            {
                loading2 ? "Loading..." : "Background"
            }
        </Button>

        <Button onClick={handelClientError} variant={'destructive'}>
            Client Error
        </Button>

        <Button onClick={handelApiError}>
            API Error
        </Button>

        <Button onClick={handelInngestError}>
            Inngest Error
        </Button>
        </div>
    );
}
 
export default DemoPage;