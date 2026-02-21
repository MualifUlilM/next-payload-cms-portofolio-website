interface SocialProofProps {
  enabled?: boolean;
  label?: string;
  clients?: { name: string }[];
}

export function SocialProof({ enabled = true, label = "Trusted by teams at", clients }: SocialProofProps) {
  if (!enabled) return null;

  const displayClients = clients?.length
    ? clients
    : [
        { name: "Acme Corp" },
        { name: "NorthBay Studio" },
        { name: "TaskFlow" },
        { name: "BuildCo" },
        { name: "Venture Labs" },
        { name: "Prodify" },
      ];

  return (
    <section className="bg-white border-y border-[#E5E5E5] py-6" aria-label="Client social proof">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#666666] whitespace-nowrap shrink-0">
            {label}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            {displayClients.map((client, i) => (
              <span key={i} className="text-sm font-medium text-[#999999] px-3 py-1 rounded bg-[#F5F5F5]">
                {client.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
