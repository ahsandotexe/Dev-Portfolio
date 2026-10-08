import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { person } from '../data/portfolio.js'
import { useContact } from '../hooks/useContact.js'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import { EASE } from '../lib/motion.js'

const fieldClass =
  'h-12 w-full border-0 border-b border-ink bg-transparent px-0 font-display text-[18px] outline-none transition-[border-color,box-shadow] focus:border-accent focus:shadow-[0_1px_0_0_rgb(var(--accent))] focus-visible:outline-none'

function Field({ id, label, error, children }) {
  return (
    <div className="grid gap-2 text-[12px] text-ink/65">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="m-0 text-[12px] text-accent">
          {error}
        </p>
      ) : null}
    </div>
  )
}

/** Right-side contact sheet (full screen on mobile). Posts to Netlify Forms; explicit sent/error states. */
export default function ContactSheet() {
  const { open, closeContact } = useContact()
  const sheetRef = useRef(null)
  const firstField = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sent | error
  useFocusTrap(sheetRef, open, { onEscape: closeContact, initialFocus: firstField })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' })

  const onSubmit = useCallback(
    async (data) => {
      setStatus('idle')
      const body = new URLSearchParams({ 'form-name': 'contact', ...data }).toString()
      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        })
        if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`)
        setStatus('sent')
        reset()
      } catch {
        setStatus('error')
      }
    },
    [reset],
  )

  const nameField = register('name', { required: 'Add your name so I know who is writing.' })

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-50 grid justify-items-end bg-ink/35"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeContact}
        >
          <m.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            onClick={(e) => e.stopPropagation()}
            className="grid h-full w-full max-w-[520px] grid-rows-[auto_1fr_auto] gap-8 overflow-auto bg-paper px-6 py-6 md:px-10 md:py-8"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-ink/65">06 — Contact</span>
              <button type="button" onClick={closeContact} className="h-11 text-[14px] hover:text-accent">
                Close ×
              </button>
            </div>

            {status === 'sent' ? (
              <div className="grid content-start gap-6">
                <h2 id="contact-title" className="m-0 font-display text-[44px] font-medium leading-[0.95] tracking-[-0.05em]">
                  Sent.
                </h2>
                <p className="m-0 text-[15px] leading-[1.55] text-ink/75">
                  Thanks for writing. I reply within a day. If it is urgent, email{' '}
                  <a href={`mailto:${person.email}`} className="border-b border-current text-ink">
                    {person.email}
                  </a>
                  .
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="justify-self-start border-b border-ink pb-1 text-[13px] font-medium hover:text-accent">
                  Write another
                </button>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                action="/"
                data-netlify="true"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="grid content-start gap-7"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden" aria-hidden="true">
                  <label>
                    Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>
                <h2 id="contact-title" className="m-0 font-display text-[44px] font-medium leading-[0.95] tracking-[-0.05em]">
                  Write to me.
                </h2>
                <Field id="contact-name" label="Name" error={errors.name?.message}>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    className={fieldClass}
                    aria-invalid={errors.name ? 'true' : undefined}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    {...nameField}
                    ref={(el) => {
                      nameField.ref(el)
                      firstField.current = el
                    }}
                  />
                </Field>
                <Field id="contact-email" label="Email" error={errors.email?.message}>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    className={fieldClass}
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    {...register('email', {
                      required: 'Add an email address so I can reply.',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: 'That email address does not look complete.' },
                    })}
                  />
                </Field>
                <Field id="contact-message" label="Message" error={errors.message?.message}>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className={`${fieldClass} h-auto resize-none py-2`}
                    aria-invalid={errors.message ? 'true' : undefined}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    {...register('message', {
                      required: 'Write a line or two about what you need.',
                      minLength: { value: 10, message: 'A few more words would help: at least 10 characters.' },
                    })}
                  />
                </Field>
                {status === 'error' ? (
                  <p role="alert" className="m-0 text-[13px] leading-[1.5] text-accent">
                    The message could not be sent. Try again, or email{' '}
                    <a href={`mailto:${person.email}`} className="border-b border-current">
                      {person.email}
                    </a>{' '}
                    directly.
                  </p>
                ) : null}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <a href={`mailto:${person.email}`} className="border-b border-current text-[13px] hover:text-accent">
                    {person.email}
                  </a>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-[52px] bg-ink px-6 text-[14px] font-medium text-paper transition-colors hover:bg-accent disabled:cursor-wait disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending…' : 'Send →'}
                  </button>
                </div>
              </form>
            )}

            <p className="m-0 text-[12px] text-ink/65">{person.availability}</p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
