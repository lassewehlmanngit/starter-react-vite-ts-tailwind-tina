import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { FormField } from '@/shared/ui/FormField';
import { Alert } from '@/shared/ui/Alert';
import { toast } from '@/shared/lib/toast';
import {
  validateForm,
  required,
  email,
  minLength,
  maxLength,
  type FieldValidation,
} from '@/shared/lib/validation';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className }) => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validationSchema: Partial<Record<keyof ContactFormData, FieldValidation>> = {
    name: [required(t('validation.required')), minLength(2), maxLength(100)],
    email: [required(t('validation.required')), email(t('validation.email'))],
    subject: [required(t('validation.required')), minLength(3), maxLength(200)],
    message: [required(t('validation.required')), minLength(10), maxLength(5000)],
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    // Validate form
    const validationErrors = validateForm(formData, validationSchema);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior: simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setSubmitStatus('success');
      setFormData(initialFormData);
      toast.success(t('status.success'), {
        description: 'Your message has been sent successfully.',
      });
    } catch (error) {
      setSubmitStatus('error');
      toast.error(t('status.error'), {
        description: 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {submitStatus === 'success' && (
        <Alert variant="success" className="mb-6">
          Thank you for your message! We'll get back to you soon.
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="destructive" className="mb-6">
          Something went wrong. Please try again later.
        </Alert>
      )}

      <div className="space-y-4">
        <FormField
          label="Name"
          htmlFor="contact-name"
          error={errors.name}
          required
        >
          <Input
            id="contact-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="contact-email"
          error={errors.email}
          required
        >
          <Input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
        </FormField>

        <FormField
          label="Subject"
          htmlFor="contact-subject"
          error={errors.subject}
          required
        >
          <Input
            id="contact-subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            aria-invalid={!!errors.subject}
          />
        </FormField>

        <FormField
          label="Message"
          htmlFor="contact-message"
          error={errors.message}
          required
        >
          <Textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            rows={5}
            aria-invalid={!!errors.message}
          />
        </FormField>

        <Button type="submit" isLoading={isSubmitting} className="w-full sm:w-auto">
          {t('actions.submit')}
        </Button>
      </div>
    </form>
  );
};
