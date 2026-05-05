'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card } from '@/components/ui/card';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: undefined,
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Here you would typically send the data to your backend
    console.log('Form submitted:', data);

    setIsSubmitting(false);
    setSubmitStatus('success');

    // Reset form after successful submission
    form.reset();

    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Top */}
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(/images/bg/section-top.jpg)' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
            <ul className="flex items-center justify-center space-x-2 text-lg">
              <li>
                <a href="/" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  Home
                </a>
              </li>
              <li className="text-white">/</li>
              <li className="text-white font-semibold">Contact</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Need help reporting a scam or have questions about our platform? Our team is here to assist you 24/7 with scam prevention and victim support.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Emergency Contact Banner */}
            <Card className="p-6 bg-red-50 border-red-200">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🚨</div>
                <div>
                  <h3 className="text-xl font-bold text-red-800 mb-2">Emergency Scam Victim Support</h3>
                  <p className="text-red-700 mb-3">
                    If you've been a victim of a scam, act immediately. Contact your bank first, then reach out to us for guidance.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600">📞</span>
                      <span className="font-medium">Emergency Hotline: +88 457 845 695</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600">📧</span>
                      <span className="font-medium">urgent@scamreport.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Headquarters</h3>
                    <p className="text-gray-600">
                      2570 Quadra Street Victoria Road,<br />
                      New York, Canada
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone Support</h3>
                    <p className="text-gray-600">+88 457 845 695</p>
                    <p className="text-sm text-gray-500">Available 24/7 for scam emergencies</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">support@scamreport.com</p>
                    <p className="text-sm text-gray-500">urgent@scamreport.com (emergencies)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">⏰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Support Hours</h3>
                    <p className="text-gray-600">
                      Emergency Line: 24/7<br />
                      General Inquiries: Mon - Fri, 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-8">
              <h2 className="text-xl font-bold mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                {[
                  { name: 'Twitter', icon: '𝕏', color: 'hover:bg-blue-400' },
                  { name: 'Facebook', icon: 'f', color: 'hover:bg-blue-600' },
                  { name: 'Instagram', icon: '📷', color: 'hover:bg-pink-500' },
                  { name: 'LinkedIn', icon: 'in', color: 'hover:bg-blue-700' }
                ].map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className={`w-12 h-12 rounded-full ${social.color}`}
                    asChild
                  >
                    <a href="#" aria-label={social.name}>
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                Thank you for your message! Our team will review your submission and respond within 2-4 hours. For emergencies, call our hotline immediately.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                Oops! Something went wrong. Please try again.
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="report">Report a Scam</SelectItem>
                          <SelectItem value="victim">I'm a Victim - Need Help</SelectItem>
                          <SelectItem value="platform">Report Fake Platform</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe the scam, include any relevant details like contact information, screenshots, or transaction details..."
                          className="resize-none"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </Button>
              </form>
            </Form>

            <p className="mt-4 text-sm text-gray-600 text-center">
              By submitting this form, you agree to our{' '}
              <a href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              {' '}and{' '}
              <a href="/terms-of-use" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              . Your information is kept confidential and used solely for scam prevention purposes.
            </p>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: 'How quickly do you respond to scam reports?',
                answer: 'We prioritize scam reports and typically respond within 2-4 hours. Emergency victim support is available 24/7 through our hotline.'
              },
              {
                question: 'Can I report a scam anonymously?',
                answer: 'Yes! You can report scams anonymously. We protect your identity and only share necessary information with authorities for investigation purposes.'
              },
              {
                question: 'What information should I include when reporting a scam?',
                answer: 'Include as much detail as possible: scammer contact info, screenshots of conversations, transaction details, dates, and any other evidence. The more information, the better we can help.'
              },
              {
                question: 'Do you work with law enforcement?',
                answer: 'Absolutely! We collaborate with financial authorities, law enforcement agencies, and regulatory bodies worldwide to investigate and shut down scam operations.'
              },
              {
                question: 'Can you help me recover money lost to a scam?',
                answer: 'While we can\'t guarantee recovery, we provide guidance on the best steps to take, connect you with authorities, and help document your case for potential recovery efforts.'
              },
              {
                question: 'How can I contribute to the community?',
                answer: 'You can contribute by reporting scams, sharing your experiences, helping verify reports, participating in discussions, and spreading awareness about scam prevention.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}