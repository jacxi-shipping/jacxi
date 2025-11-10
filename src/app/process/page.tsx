'use client';

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  CurrencyDollarIcon,
  DocumentTextIcon,
  TruckIcon,
  MapPinIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function ProcessPage() {
  const { t } = useTranslation();

  const steps = [
    {
      step: 1,
      title: t('process.step1.title'),
      description: t('process.step1.description'),
      icon: CurrencyDollarIcon,
      details: [
        'Fill out our online quote form',
        'Provide vehicle details and destination',
        'Receive instant pricing',
        'Compare different shipping options'
      ],
      color: 'bg-jacxi-blue',
      textColor: 'text-jacxi-blue'
    },
    {
      step: 2,
      title: t('process.step2.title'),
      description: t('process.step2.description'),
      icon: DocumentTextIcon,
      details: [
        'Review and accept the quote',
        'Complete booking form',
        'Make secure payment',
        'Receive booking confirmation'
      ],
      color: 'bg-green-600',
      textColor: 'text-green-600'
    },
    {
      step: 3,
      title: t('process.step3.title'),
      description: t('process.step3.description'),
      icon: TruckIcon,
      details: [
        'Schedule pickup appointment',
        'Professional vehicle inspection',
        'Secure loading and documentation',
        'Real-time pickup confirmation'
      ],
      color: 'bg-jacxi-orange',
      textColor: 'text-jacxi-orange'
    },
    {
      step: 4,
      title: t('process.step4.title'),
      description: t('process.step4.description'),
      icon: MapPinIcon,
      details: [
        'Secure container or vessel loading',
        'Ocean or air transportation',
        'Customs clearance processing',
        'Continuous monitoring and updates'
      ],
      color: 'bg-purple-600',
      textColor: 'text-purple-600'
    },
    {
      step: 5,
      title: t('process.step5.title'),
      description: t('process.step5.description'),
      icon: ShieldCheckIcon,
      details: [
        'Arrival at destination port',
        'Customs clearance and inspection',
        'Final delivery to your location',
        'Vehicle handover and documentation'
      ],
      color: 'bg-indigo-600',
      textColor: 'text-indigo-600'
    }
  ];

  const timeline = [
    {
      phase: 'Preparation',
      duration: '1-2 days',
      description: 'Quote, booking, and documentation',
      icon: DocumentTextIcon
    },
    {
      phase: 'Pickup',
      duration: '1 day',
      description: 'Vehicle collection and inspection',
      icon: TruckIcon
    },
    {
      phase: 'Transit',
      duration: '15-25 days',
      description: 'Ocean transportation to destination',
      icon: MapPinIcon
    },
    {
      phase: 'Delivery',
      duration: '2-3 days',
      description: 'Customs clearance and final delivery',
      icon: ShieldCheckIcon
    }
  ];

  const benefits = [
    {
      title: 'Real-time Tracking',
      description: 'Monitor your vehicle\'s journey with live updates',
      icon: ClockIcon
    },
    {
      title: 'Full Insurance',
      description: 'Comprehensive coverage for complete peace of mind',
      icon: ShieldCheckIcon
    },
    {
      title: 'Expert Handling',
      description: 'Professional team with years of experience',
      icon: CheckCircleIcon
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer service and assistance',
      icon: ClockIcon
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jacxi-blue to-jacxi-blue-dark text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('process.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t('process.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
              >
                {/* Content */}
                <div className="flex-1">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white text-2xl font-bold`}>
                          {step.step}
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{step.title}</CardTitle>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <CheckCircleIcon className={`h-5 w-5 ${step.textColor} mt-0.5 flex-shrink-0`} />
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <div className="relative">
                    <div className={`w-32 h-32 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <step.icon className="h-16 w-16 text-white" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-32 bg-gray-300">
                        <div className={`absolute top-0 left-0 w-full h-1/2 ${step.color}`}></div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shipping Timeline
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Typical timeline for vehicle shipping from USA to Afghanistan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="mx-auto w-16 h-16 bg-jacxi-blue/10 rounded-full flex items-center justify-center mb-4">
                      <phase.icon className="h-8 w-8 text-jacxi-blue" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {phase.phase}
                    </h3>
                    <div className="text-2xl font-bold text-jacxi-blue mb-2">
                      {phase.duration}
                    </div>
                    <p className="text-sm text-gray-600">
                      {phase.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose JACXI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide exceptional service with complete transparency and peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <benefit.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-jacxi-blue text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Shipping Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a free quote and begin your vehicle shipping journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-white text-jacxi-blue hover:bg-white/90">
              Get Free Quote
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/90 hover:text-jacxi-blue">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
