import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">iQlick</h3>
            <p className="text-background/80 mb-4">
              Tu mejor opción para adquirir tecnología con opciones de financiación a través de nuestras entidades
              aliadas.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/iqlick.co?locale=es_LA"
                className="hover:text-primary transition-colors"
                target="_blank"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/iqlick.co/"
                className="hover:text-primary transition-colors"
                target="_blank"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4"></h4>
            <ul className="space-y-2 text-background/80"></ul>
          </div>

          <div>
            <h4 className="font-bold mb-4"></h4>
            <ul className="space-y-2 text-background/80"></ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-background/80">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:web@iqlick.co" className="hover:text-primary transition-colors">
                  web@iqlick.co
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="tel:+573113526643" className="hover:text-primary transition-colors">
                  +57 311 3526643
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Medellín,Antioquia, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/80 text-sm">
          <p>&copy; {new Date().getFullYear()} iQlick. Todos los derechos reservados.</p>
          <p className="mt-2">
            Los datos personales que nos proporciones serán tratados de acuerdo con nuestra política de privacidad y la
            normativa vigente de protección de datos.
          </p>
        </div>
      </div>
    </footer>
  );
};
