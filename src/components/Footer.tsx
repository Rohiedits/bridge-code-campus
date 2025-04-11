
import { Link } from "react-router-dom";
import { GraduationCap, ExternalLink, Instagram, Twitter, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">Campus Bridge</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Bridging academic learning with practical coding skills 
              for tomorrow's tech leaders.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Platform
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-primary text-sm">
                  Academic Courses
                </Link>
              </li>
              <li>
                <Link to="/codelab" className="text-muted-foreground hover:text-primary text-sm">
                  Code Lab
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-primary text-sm">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link to="/ai-assist" className="text-muted-foreground hover:text-primary text-sm">
                  AI Assistants
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:support@campusbridge.edu" 
                  className="text-muted-foreground hover:text-primary text-sm flex items-center"
                >
                  Contact Us
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <Link to="/feedback" className="text-muted-foreground hover:text-primary text-sm">
                  Submit Feedback
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Connect
            </h3>
            <div className="mt-4 flex space-x-4">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@campusbridge.edu"
                className="text-muted-foreground hover:text-primary"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Sign up for our newsletter to get the latest updates.
            </p>
            <form className="mt-2 flex">
              <input
                type="email"
                className="min-w-0 flex-1 rounded-l-md border border-input bg-background px-3 py-1.5 text-sm"
                placeholder="Your email"
              />
              <button
                type="submit"
                className="inline-flex items-center rounded-r-md border border-l-0 border-input bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Campus Bridge. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
