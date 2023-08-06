import { Link } from "../Link"

const i18n = {
    es: {
        title: "Sobre nosotros",
        button: "Ir al home",
        description: "Hola, mi nombre es Camilo y estoy creando un clone de React Router."
    },
    en: {
        title: "About us",
        button: "Go to home",
        description: "Hi, my name is Camilo and I am areating a clone of React Router."
    }
}

const useI18n = (lang) => {
    return i18n[lang] || i18n.en
}


export default function AboutPage({ routeParams }) {
    const i18n = useI18n(routeParams.lang ?? 'es')
    return (
        <>
            <h1>{i18n.title}</h1>
            <img
                src='/vite.svg'
                alt='Foto de differnt'
            />
            <p>{i18n.description}</p>
            <Link to='/'>{i18n.button}</Link>
        </>
    )
}