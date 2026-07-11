import { Palette, Monitor, PenTool, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: PenTool,
    title: "Graphic Design",
    description:
      "Crafting stunning layouts, branding materials, photo editing, and visual storytelling that captures attention and communicates effectively.",
    features: ["Brand Identity", "Print Design", "Photo Editing", "Marketing Materials"],
    color: "from-orange-500/10 to-red-500/10",
  },
  {
    icon: Monitor,
    title: "Web Design",
    description:
      "Designing modern, intuitive, and visually appealing websites that effectively communicate your brand message and convert visitors.",
    features: ["Responsive Design", "Landing Pages", "E-commerce", "Brand Integration"],
    color: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating user-friendly, engaging interfaces for apps and websites. I focus on intuitive navigation, visual hierarchy, and delightful user experiences.",
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    color: "from-violet-500/10 to-purple-500/10",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-secondary/50 relative overflow-hidden noise">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-background to-transparent rounded-full pointer-events-none opacity-60" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground font-medium tracking-widest uppercase text-sm mb-4">
            What I Do
          </p>
          <h2 className="heading-lg">
            Services I Offer
          </h2>
          <p className="body-md text-muted-foreground mt-4">
            Transforming ideas into exceptional digital experiences through thoughtful design
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group modern-card p-8 lg:p-10 relative overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-foreground text-background rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <service.icon size={28} />
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="text-sm flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 bg-foreground rounded-full flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn more link */}
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 text-sm font-semibold group/link"
                >
                  <span className="link-underline">Learn More</span>
                  <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
