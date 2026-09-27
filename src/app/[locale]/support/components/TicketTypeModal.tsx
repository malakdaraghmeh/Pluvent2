"use client";

import React, { useState } from "react";
import { Folder, MessageSquare, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Path to your dialog component file
import TicketIllustration from "@icons/general-ticket.svg"

interface TicketTypeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue?: (selectedType: "project" | "general") => void;
}

export default function TicketTypeModal({
  open,
  onOpenChange,
  onContinue,
}: TicketTypeModalProps) {
  const [selectedType, setSelectedType] = useState<"project" | "general">(
    "general"
  );

  const handleContinue = () => {
    if (onContinue) {
      onContinue(selectedType);
    }
  };

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent
              showCloseButton={false} // Custom close button position used inside layout
              className="sm:max-w-xl max-w-lg p-8 bg-white rounded-3xl border-0 shadow-2xl text-center"
          >
              {/* Custom Close Button in top right */}
              <button
                  onClick={() => onOpenChange(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#100D40] text-white flex items-center justify-center hover:bg-[#1a1758] transition-colors"
                  aria-label="Close"
              >
                  <X className="w-4 h-4 stroke-[2.5]" />
              </button>

              <DialogHeader className="items-center text-center space-y-2">
                  {/* Top Illustration graphic */}
                  <div className="w-full flex justify-center mb-2">
                      <TicketIllustration />
                  </div>

                  <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-[#100D40] tracking-tight">
                      What is your ticket about?
                  </DialogTitle>

                  <DialogDescription className="text-gray-400 text-sm font-normal">
                      Choose the type of ticket you&apos;d like to create.
                  </DialogDescription>
              </DialogHeader>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                  {/* Card 1: Project completed */}
                  <button
                      type="button"
                      onClick={() => setSelectedType('project')}
                      className={`p-6 rounded-2xl text-center transition-all flex flex-col items-center justify-center border-2 ${
                          selectedType === 'project'
                              ? 'border-cyan-400 bg-sky-50/40 ring-1 ring-cyan-400'
                              : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                  >
                      <div className="w-12 h-12 rounded-2xl bg-[#00E5C810] flex items-center justify-center text-[#4F46E5] mb-4">
                          <Folder className="w-6 h-6 stroke-[2]" />
                      </div>
                      <h4 className="text-base font-bold text-[#100D40] mb-2">Project completed</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                          Get help with a specific project, including technical issues,
                          deliverables, updates, or project-related requests.
                      </p>
                  </button>

                  {/* Card 2: General Inquiry */}
                  <button
                      type="button"
                      onClick={() => setSelectedType('general')}
                      className={`p-6 rounded-2xl text-center transition-all flex flex-col items-center justify-center border-2 ${
                          selectedType === 'general'
                              ? 'border-cyan-400 bg-sky-50/40 ring-1 ring-cyan-400'
                              : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                  >
                      <div className="w-12 h-12 rounded-2xl bg-[#00E5C810] flex items-center justify-center text-[#4F46E5] mb-4">
                          <MessageSquare className="w-6 h-6 stroke-[2]" />
                      </div>
                      <h4 className="text-base font-bold text-[#100D40] mb-2">General Inquiry</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                          Contact Pulvent about a service, ask a general question, request
                          information, or get in touch with our team.
                      </p>
                  </button>
              </div>

              {/* Continue Button */}
              <button
                  onClick={handleContinue}
                  className="w-full py-4 px-6 rounded-2xl bg-[#100D40] hover:bg-[#1a1758] text-white font-medium text-base flex items-center justify-center gap-2 transition-all shadow-md"
              >
                  <span>Continue</span>
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
          </DialogContent>
      </Dialog>
  );
}

