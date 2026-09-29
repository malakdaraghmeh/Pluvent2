import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/assets';

export default function Footer() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const services = [
        { name: t('footer.services.items.it'), path: '#' },
        { name: t('footer.services.items.marketing'), path: '#' },
        { name: t('footer.services.items.uiux'), path: '#' },
        { name: t('footer.services.items.data'), path: '#' },
        { name: t('footer.services.items.design'), path: '#' },
        { name: t('footer.services.items.consulting'), path: '#' },
    ];

    const companyLinks = [
        { name: t('footer.company.about'), path: '/about' },
        { name: t('footer.company.projects'), path: '/projects' },
    ];

    const socialLinks = [
        { icon: Instagram, path: '#' },
        { icon: Facebook, path: '#' },
        { icon: Twitter, path: '#' },
        { icon: Linkedin, path: '#' },
    ];

    return (
        <footer className="bg-[#201E77] text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
                    {/* Branding Column */}
                    <div className="flex flex-col gap-6">
                        <Link to={`/${lang}`} className="block">
                            <img
                                src={Logo}
                                alt={t('notFound.logoAlt')}
                                className="w-32 h-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="text-white/80 text-sm leading-relaxed max-w-xs">
                            {t('footer.description')}
                        </p>
                        <div className="flex flex-col gap-3">
                            <span className="text-sm font-medium">{t('footer.followUs')}</span>
                            <div className="flex gap-3">
                                {socialLinks.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.path}
                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-tr from-accent to-main hover:bg-accent hover:text-white transition-all duration-300 backdrop-blur-sm"
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-accent relative inline-block">
                            {t('footer.services.title')}
                            <div
                                className={`absolute -bottom-1 ${lang === 'ar' ? 'right-0 flex-row-reverse' : 'left-0 flex-row'} flex gap-1`}
                            >
                                <span className="w-[10px] h-[2px] bg-accent rounded-full" />
                                <span className="w-[6px] h-[2px] bg-accent rounded-full opacity-60" />
                                <span className="w-[6px] h-[2px] bg-accent rounded-full opacity-40" />
                            </div>
                        </h3>
                        <ul className="mt-6 flex flex-col gap-4">
                            {services.map((service, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={service.path}
                                        className="text-white/80 hover:text-accent text-sm transition-colors"
                                    >
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-accent relative inline-block">
                            {t('footer.company.title')}
                            <div
                                className={`absolute -bottom-1 ${lang === 'ar' ? 'right-0 flex-row-reverse' : 'left-0 flex-row'} flex gap-1`}
                            >
                                <span className="w-[10px] h-[2px] bg-accent rounded-full" />
                                <span className="w-[6px] h-[2px] bg-accent rounded-full opacity-60" />
                                <span className="w-[6px] h-[2px] bg-accent rounded-full opacity-40" />
                            </div>
                        </h3>
                        <ul className="mt-6 flex flex-col gap-4">
                            {companyLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={`/${lang}${link.path}`}
                                        className="text-white/80 hover:text-accent text-sm transition-colors hover:underline"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {/* Contact Column */}
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex gap-2 items-start group">
                                <div className="p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                                    <MapPin size={20} className="text-white" />
                                </div>
                                <span className="text-sm text-white/80 leading-relaxed">
                                    {t('footer.contact.address')}
                                </span>
                            </div>
                            <div className="flex gap-2 items-center group">
                                <div className="p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                                    <Mail size={20} className="text-white" />
                                </div>
                                <a
                                    href="mailto:contact@pulvent.com"
                                    className="text-sm text-white/80 hover:text-accent transition-colors"
                                >
                                    contact@pulvent.com
                                </a>
                            </div>
                            <div className="flex gap-2 items-center group">
                                <div className="p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                                    <Phone size={20} className="text-white" />
                                </div>
                                <a
                                    href="tel:+201550009295"
                                    dir="ltr"
                                    className="text-sm text-white/80 hover:text-accent transition-colors"
                                >
                                    +20 15 50009295
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/60">
                        © {new Date().getFullYear()} {t('footer.rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
