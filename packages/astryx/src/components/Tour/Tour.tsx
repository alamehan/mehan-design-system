'use client';

import React, {useEffect, useState} from 'react';
import {X} from 'lucide-react';

export interface TourStepItem {
  /** Stable step identifier */
  id: string;
  /** Sentence-case step headline */
  title: string;
  /** Concise explanation (1–2 sentences) */
  description: string;
  /** Optional CSS selector highlighted on page while this step is active */
  targetSelector?: string;
}

export interface TourProps {
  /** Ordered guided walkthrough steps */
  steps: readonly TourStepItem[];
  /** Whether the guided tour coachmark is open */
  isOpen: boolean;
  /** Called when closed, skipped, or finished */
  onOpenChange: (open: boolean) => void;
  /** Optional controlled 0-based step index */
  currentStep?: number;
  /** Called whenever active step index changes */
  onStepChange?: (stepIndex: number) => void;
  /** Optional callback fired when user clicks Finish on the final step */
  onFinish?: () => void;
  /** Accessible dialog label */
  label?: string;
}

export function Tour({
  steps,
  isOpen,
  onOpenChange,
  currentStep: controlledStep,
  onStepChange,
  onFinish,
  label = 'Product tour',
}: TourProps) {
  const [internalStep, setInternalStep] = useState(0);
  const stepIdx = Math.min(
    Math.max(0, steps.length - 1),
    controlledStep ?? internalStep,
  );
  const step = steps[stepIdx];

  useEffect(() => {
    if (isOpen && controlledStep === undefined) {
      setInternalStep(0);
    }
  }, [isOpen, controlledStep]);

  const goTo = (next: number) => {
    const clamped = Math.min(steps.length - 1, Math.max(0, next));
    if (controlledStep === undefined) setInternalStep(clamped);
    onStepChange?.(clamped);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (e.key === 'Escape') {
        const higherLayer = document.querySelector(
          '.mehan-nc-popover, .mehan-color-well-popover, .mehan-split-menu, .mehan-czb-menu, [role="alertdialog"], [aria-modal="true"]',
        );
        if (higherLayer) return;
        e.preventDefault();
        onOpenChange(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (!isOpen || !step?.targetSelector) return;
    const el = document.querySelector<HTMLElement>(step.targetSelector);
    if (!el) return;
    el.setAttribute('data-mehan-tour-target', 'true');
    return () => {
      el.removeAttribute('data-mehan-tour-target');
    };
  }, [isOpen, step]);

  if (!isOpen || !step) return null;

  const isLast = stepIdx === steps.length - 1;

  return (
    <div
      role="dialog"
      aria-label={`${label}: step ${stepIdx + 1} of ${steps.length}`}
      className="mehan-tour-card">
      <div className="mehan-tour-top">
        <span className="mehan-tour-counter">
          Step {stepIdx + 1} of {steps.length}
        </span>
        <button
          type="button"
          className="mehan-tour-close"
          aria-label="Skip tour"
          onClick={() => onOpenChange(false)}>
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      <h4 className="mehan-tour-title">{step.title}</h4>
      <p className="mehan-tour-desc">{step.description}</p>

      <div className="mehan-tour-footer">
        <div className="mehan-tour-dots" aria-hidden="true">
          {steps.map((s, idx) => (
            <span
              key={s.id}
              className="mehan-tour-dot"
              data-active={idx === stepIdx ? 'true' : undefined}
            />
          ))}
        </div>

        <div className="mehan-tour-actions">
          {stepIdx === 0 ? (
            <button
              type="button"
              className="mehan-tour-skip"
              onClick={() => onOpenChange(false)}>
              Skip tour
            </button>
          ) : (
            <button
              type="button"
              className="mehan-tour-prev"
              onClick={() => goTo(stepIdx - 1)}>
              Back
            </button>
          )}

          <button
            type="button"
            className="mehan-tour-next"
            onClick={() => {
              if (isLast) {
                onFinish?.();
                onOpenChange(false);
              } else {
                goTo(stepIdx + 1);
              }
            }}>
            {isLast ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
