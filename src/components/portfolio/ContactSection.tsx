import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, Instagram, Send, MapPin, ArrowUpRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const EMAILJS_SERVICE_ID = "service_xown6ka";
const EMAILJS_TEMPLATE_ID = "template_9c0wmjb";
const EMAILJS_PUBLIC_KEY = "dSksuU6CmZUHSrrg5";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "harshbhidekar8142@gmail.com",
    href: "mailto:harshbhidekar8142@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8767471943",
    href: "tel:+918767471943",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@editorial.tattvix",
    href: "https://instagram.com/editorial.tattvix",
  },
  {
    icon: Globe,
    label: "Behance",
    value: "Editorial_Tattvix",
    href: "https://www.behance.net/Editorial_Tattvix",
  },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-foreground text-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-background/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-background/5 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
          <p className="text-background/60 font-medium tracking-widest uppercase text-sm mb-4">
            Get In Touch
          </p>
          <h2 className="heading-lg text-background">
            Let's Work Together
          </h2>
          <p className="body-md text-background/60 mt-4">
            Have a project in mind? Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 p-4 rounded-2xl border border-background/10 hover:border-background/30 hover:bg-background/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-all duration-300">
                    <item.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-background/50 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="font-medium truncate">
                      {item.value}
                    </p>
                  </div>
                  <ArrowUpRight size={18} className="text-background/30 group-hover:text-background transition-colors" />
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="p-6 rounded-2xl bg-background/5 border border-background/10">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={18} className="text-background/60" />
                <span className="text-sm text-background/60">Location</span>
              </div>
              <p className="font-medium">India</p>
              <p className="text-sm text-background/60 mt-1">Available for remote work worldwide</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background/5 border-background/20 h-14 rounded-xl text-background placeholder:text-background/40 focus:border-background/50 focus:ring-0"
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background/5 border-background/20 h-14 rounded-xl text-background placeholder:text-background/40 focus:border-background/50 focus:ring-0"
                />
              </div>
            </div>

            <Input
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="bg-background/5 border-background/20 h-14 rounded-xl text-background placeholder:text-background/40 focus:border-background/50 focus:ring-0"
            />

            <Textarea
              name="message"
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="bg-background/5 border-background/20 rounded-xl text-background placeholder:text-background/40 resize-none focus:border-background/50 focus:ring-0"
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full h-14 rounded-xl bg-background text-foreground hover:bg-background/90 font-semibold text-base"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <Send size={18} className="ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} Harsh Bhidekar. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#home" className="text-sm text-background/50 hover:text-background transition-colors">
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
