import { Link } from 'react-router-dom'
import Logo from '../logo'

function Footer() {
    const links = {
        Company: ['Features', 'Pricing', 'Affiliate Program', 'Press Kit'],
        Support:  ['Account', 'Help', 'Contact Us', 'Customer Support'],
        Legals:   ['Terms & Conditions', 'Privacy Policy', 'Licensing'],
    }

    return (
        <footer className="bg-white border-t border-slate-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Logo />
                        <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                            A modern blogging platform for writers and readers.
                        </p>
                        <p className="mt-6 text-xs text-slate-400">
                            © {new Date().getFullYear()} MegaBlog. All rights reserved.
                        </p>
                    </div>

                    {/* Link columns */}
                    {Object.entries(links).map(([section, items]) => (
                        <div key={section}>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                                {section}
                            </h3>
                            <ul className="space-y-3">
                                {items.map((item) => (
                                    <li key={item}>
                                        <Link
                                            to="/"
                                            className="text-sm text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer
