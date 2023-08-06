import { useState, useEffect, Children } from "react"
import { EVENTS } from "./consts"
import { match } from "path-to-regexp"
import { getCurrentPath } from "./utils"


export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
    const [currentPath, setCurrentPath] = useState(getCurrentPath())
    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }

        //Escucha el evento de ir hacia adelante en la navigacion
        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)

        //Escuchar el evento de dar click al boton de atrás
        window.addEventListener(EVENTS.POPSTATE, onLocationChange)

        return () => {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
        }
    }, [])

    let routeParams = {}


    //add routes from children <Route /> components
    const routesFromChildren = Children.map(children, ({ props, type }) => {
        const { name } = type
        const isRoute = name === 'Route'

        return isRoute ? props : null
    })

    const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

    //get page by path
    const Page = routesToUse.find(({ path }) => {
        if (path === currentPath) return true

        //Dynamically routes /search/:query
        const matcherUrl = match(path, { decode: decodeURIComponent })
        const matched = matcherUrl(currentPath)
        if (!matched) return false

        routeParams = matched.params //{query: 'java'} // /search/java
        return true
    })?.Component
    return Page ?
        <Page routeParams={routeParams} /> :
        <DefaultComponent routeParams={routeParams} />
}