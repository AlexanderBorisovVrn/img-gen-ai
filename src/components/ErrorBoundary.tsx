import React from "react";

type MyState = {
    error: boolean
}
type MyProps = {
    children: React.ReactNode
}
 export class ErrorBoundary extends React.Component<MyProps, MyState>{
    state: Readonly<MyState> = {
        error: false
    };



    render(): React.ReactNode {
        if (this.state.error) {
            return(
                <div className="flex w-full h-full items-center justify-center">Something went terribly wrong...</div>
            )
        } else {
            return this.props.children
        }
    }


}
