"use client";

import { Button } from './Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { Input } from './Input';
import { Badge } from './Badge';
import { Alert } from './Alert';
import { Progress } from './Progress';
import { motion } from 'framer-motion';
import { makeSmooth } from '@/lib/motion';

export default function JACXIDesignShowcase() {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={makeSmooth()}
        className="text-center space-y-4"
      >
        <h1 className="text-display-2xl font-bold text-brand-navy text-balance">
          JACXI Design System
        </h1>
        <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
          Premium design tokens for luxury vehicle shipping experiences
        </p>
      </motion.div>

      {/* Brand Colors */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={makeSmooth({ delay: 0.1 })}
        className="space-y-6"
      >
        <h2 className="text-heading-xl font-semibold text-brand-navy">JACXI Brand Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'brand-navy', color: 'bg-brand-navy', text: 'text-brand-white' },
            { name: 'brand-cyan', color: 'bg-brand-cyan', text: 'text-white' },
            { name: 'brand-gold', color: 'bg-brand-gold', text: 'text-brand-charcoal' },
            { name: 'brand-white', color: 'bg-brand-white', text: 'text-brand-charcoal' },
            { name: 'brand-charcoal', color: 'bg-brand-charcoal', text: 'text-brand-white' },
            { name: 'brand-gray', color: 'bg-brand-gray', text: 'text-brand-charcoal' },
          ].map((item) => (
            <div key={item.name} className="space-y-2">
              <div className={`h-16 rounded-lg border-2 border-neutral-200 ${item.color} flex items-center justify-center ${item.text}`}>
                <span className="text-ui-sm font-medium">{item.name}</span>
              </div>
              <div className="text-center">
                <p className="text-ui-sm font-medium text-neutral-900">{item.name.replace('brand-', '')}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Typography Scale */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={makeSmooth({ delay: 0.2 })}
        className="space-y-6"
      >
        <h2 className="text-heading-xl font-semibold text-brand-navy">Typography Scale</h2>
        <div className="space-y-4">
          {[
            { class: 'text-display-2xl', name: 'Display 2XL', usage: 'Hero headlines', weight: 'font-black' },
            { class: 'text-display-xl', name: 'Display XL', usage: 'Major section headers', weight: 'font-black' },
            { class: 'text-heading-2xl', name: 'Heading 2XL', usage: 'Page titles', weight: 'font-bold' },
            { class: 'text-heading-xl', name: 'Heading XL', usage: 'Section headers', weight: 'font-bold' },
            { class: 'text-heading-lg', name: 'Heading LG', usage: 'Card titles', weight: 'font-semibold' },
            { class: 'text-body-xl', name: 'Body XL', usage: 'Lead paragraphs', weight: 'font-normal' },
            { class: 'text-body-lg', name: 'Body LG', usage: 'Regular text', weight: 'font-normal' },
            { class: 'text-ui-lg', name: 'UI LG', usage: 'Buttons & labels', weight: 'font-semibold' },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between py-3 px-4 border border-neutral-200 rounded-lg hover:bg-neutral-50">
              <div className="flex-1">
                <p className={`${item.class} ${item.weight} text-brand-navy mb-1`}>{item.name}</p>
                <p className="text-body-sm text-neutral-600">{item.usage}</p>
              </div>
              <code className="text-ui-sm bg-neutral-100 px-2 py-1 rounded text-neutral-700 ml-4">
                {item.class}
              </code>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Component Showcase */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={makeSmooth({ delay: 0.3 })}
        className="space-y-8"
      >
        <h2 className="text-heading-xl font-semibold text-brand-navy">Component Library</h2>

        {/* Buttons */}
        <div className="space-y-4">
          <h3 className="text-heading-lg font-medium text-brand-navy">Buttons</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Button variant="default">Default</Button>
              <code className="text-ui-xs text-neutral-600 block text-center">default</code>
            </div>
            <div className="space-y-2">
              <Button variant="primary">Primary</Button>
              <code className="text-ui-xs text-neutral-600 block text-center">primary</code>
            </div>
            <div className="space-y-2">
              <Button variant="glass">Glass</Button>
              <code className="text-ui-xs text-neutral-600 block text-center">glass</code>
            </div>
            <div className="space-y-2">
              <Button variant="success">Success</Button>
              <code className="text-ui-xs text-neutral-600 block text-center">success</code>
            </div>
            <div className="space-y-2">
              <Button variant="outline">Outline</Button>
              <code className="text-ui-xs text-neutral-600 block text-center">outline</code>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          <h3 className="text-heading-lg font-medium text-brand-navy">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard card styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm">Clean, professional appearance.</p>
              </CardContent>
            </Card>

            <Card variant="glass-dark">
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
                <CardDescription>Modern glass morphism</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm">Backdrop blur with transparency.</p>
              </CardContent>
            </Card>

            <Card variant="brand" className="text-brand-white">
              <CardHeader>
                <CardTitle>Brand Card</CardTitle>
                <CardDescription>Luxury gradient</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm">Premium brand appearance.</p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Enhanced shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm">Hover for enhanced depth.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <h3 className="text-heading-lg font-medium text-brand-navy">Inputs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                variant="glass-dark"
                size="lg"
                placeholder="Glass dark input"
                leftIcon={<span>🔍</span>}
              />
              <Input
                variant="outline"
                size="md"
                placeholder="Outline input"
                state="success"
                helperText="Valid input"
              />
              <Input
                variant="default"
                size="md"
                placeholder="Default input"
                state="error"
                helperText="This field is required"
              />
            </div>
            <div className="space-y-4">
              <Input
                variant="filled"
                size="md"
                placeholder="Filled input"
                rightIcon={<span>📧</span>}
              />
              <Input
                variant="glass"
                size="md"
                placeholder="Glass input"
                leftIcon={<span>🔒</span>}
              />
            </div>
          </div>
        </div>

        {/* Status Elements */}
        <div className="space-y-4">
          <h3 className="text-heading-lg font-medium text-brand-navy">Status Elements</h3>

          {/* Badges */}
          <div className="space-y-2">
            <h4 className="text-heading-sm font-medium text-brand-navy">Status Badges</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="status-in-transit">In Transit</Badge>
              <Badge variant="status-delivered">Delivered</Badge>
              <Badge variant="status-at-port">At Port</Badge>
              <Badge variant="status-delayed">Delayed</Badge>
              <Badge variant="status-pickup-scheduled">Pickup Scheduled</Badge>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-2">
            <h4 className="text-heading-sm font-medium text-brand-navy">Progress Indicators</h4>
            <div className="space-y-4">
              <Progress value={75} showValue variant="brand" size="md" />
              <Progress value={45} showValue variant="success" size="sm" />
              <Progress value={90} showValue variant="default" size="lg" />
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          <h3 className="text-heading-lg font-medium text-brand-navy">Alerts & Notifications</h3>
          <div className="space-y-4">
            <Alert variant="success">
              <strong>Shipment Created!</strong> Your vehicle has been successfully registered for shipping.
            </Alert>
            <Alert variant="warning">
              <strong>Customs Clearance Required</strong> Please ensure all documentation is complete.
            </Alert>
            <Alert variant="error">
              <strong>Shipping Delay</strong> There may be a delay due to weather conditions.
            </Alert>
            <Alert variant="info">
              <strong>Real-time Tracking</strong> Your shipment is now in transit with live updates available.
            </Alert>
            <Alert variant="brand" onClose={() => console.log('Alert closed')}>
              <strong>Premium Service</strong> You have access to VIP handling and priority processing.
            </Alert>
          </div>
        </div>
      </motion.section>

      {/* Effects Showcase */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={makeSmooth({ delay: 0.4 })}
        className="space-y-6"
      >
        <h2 className="text-heading-xl font-semibold text-brand-navy">Visual Effects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Glass Morphism */}
          <div className="space-y-4">
            <h3 className="text-heading-md font-medium text-brand-navy">Glass Morphism</h3>
            <div className="space-y-3">
              <div className="glass-subtle p-4 rounded-lg">
                <p className="text-body-sm">Subtle glass effect</p>
              </div>
              <div className="glass-medium p-4 rounded-lg">
                <p className="text-body-sm">Medium glass effect</p>
              </div>
              <div className="glass-strong p-4 rounded-lg">
                <p className="text-body-sm">Strong glass effect</p>
              </div>
            </div>
          </div>

          {/* Gradients */}
          <div className="space-y-4">
            <h3 className="text-heading-md font-medium text-brand-navy">Brand Gradients</h3>
            <div className="space-y-3">
              <div className="bg-brand-gradient p-4 rounded-lg text-brand-white">
                <p className="text-body-sm font-medium">Navy Gradient</p>
              </div>
              <div className="bg-brand-cyan-gradient p-4 rounded-lg text-white">
                <p className="text-body-sm font-medium">Cyan Gradient</p>
              </div>
              <div className="bg-brand-gold-gradient p-4 rounded-lg text-brand-charcoal">
                <p className="text-body-sm font-medium">Gold Gradient</p>
              </div>
            </div>
          </div>

          {/* Shadows */}
          <div className="space-y-4">
            <h3 className="text-heading-md font-medium text-brand-navy">Brand Shadows</h3>
            <div className="space-y-3">
              <div className="bg-brand-white p-4 rounded-lg shadow-brand-navy border">
                <p className="text-body-sm">Navy Shadow</p>
              </div>
              <div className="bg-brand-white p-4 rounded-lg shadow-brand-cyan border">
                <p className="text-body-sm">Cyan Shadow</p>
              </div>
              <div className="bg-brand-white p-4 rounded-lg shadow-brand-gold border">
                <p className="text-body-sm">Gold Shadow</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Usage Guidelines */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={makeSmooth({ delay: 0.5 })}
        className="space-y-6"
      >
        <h2 className="text-heading-xl font-semibold text-brand-navy">Implementation Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>🚀 Quick Start</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <code className="text-ui-sm bg-neutral-100 px-2 py-1 rounded">import &#123; Button &#125; from &apos;@/components/ui/Button&apos;</code>
              </div>
              <div>
                <code className="text-ui-sm bg-neutral-100 px-2 py-1 rounded">&lt;Button variant=&quot;primary&quot;&gt;Click me&lt;/Button&gt;</code>
              </div>
              <p className="text-body-sm text-neutral-600">
                All components follow consistent APIs with TypeScript support.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>🎨 Design Principles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-body-sm text-neutral-600">
                <li>• <strong>Consistency:</strong> Unified design language</li>
                <li>• <strong>Accessibility:</strong> WCAG AA compliant</li>
                <li>• <strong>Performance:</strong> Optimized animations</li>
                <li>• <strong>Luxury:</strong> Premium user experience</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-brand-navy text-brand-white rounded-2xl">
          <h3 className="text-heading-lg font-semibold mb-4">JACXI Brand Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-heading-sm font-medium mb-2 text-brand-cyan">Trust</h4>
              <p className="text-body-sm opacity-90">Government-certified processes with complete transparency.</p>
            </div>
            <div>
              <h4 className="text-heading-sm font-medium mb-2 text-brand-cyan">Luxury</h4>
              <p className="text-body-sm opacity-90">Premium handling for high-value vehicles worldwide.</p>
            </div>
            <div>
              <h4 className="text-heading-sm font-medium mb-2 text-brand-cyan">Excellence</h4>
              <p className="text-body-sm opacity-90">VIP-grade service from pickup to final delivery.</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
