"use client";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../components/button";
import InfoModal from "../components/modal";
import Image from "next/image";
import { useAccount, useEnsAddress } from "wagmi";
import { isAddress } from "viem";

const Input = ({
  value,
  handleChange,
  placeholder,
}: {
  value?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="text-grey-200 bg-blue-800 border border-grey-200 rounded-lg w-full px-2 py-3"
      value={value}
      onChange={(e) => handleChange(e)}
    />
  );
};

const CheckBalance = ({
  points,
  address,
  setAddress,
  isDataLoading,
  checkPoints,
  scrollToFaq,
  openPointsBreakdownModal,
}: {
  points?: number;
  address?: string;
  setAddress: Dispatch<SetStateAction<string | undefined>>;
  isDataLoading?: boolean;
  checkPoints: () => void;
  scrollToFaq: () => void;
  openPointsBreakdownModal: () => void;
}) => {
  const Congratulations = () => (
    <div className="rounded-[32px] bg-blue-800 py-12 md:px-28 sm:px-12 px-4 mx-auto max-w-4xl xl:w-[60vw] sm:w-[90vw] w-[96vw] mt-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl text-yellow-500 font-semibold font-grotesk mb-2">
          Congratulations!
        </h1>
        <p className="text-2xl text-white mb-2">You have {points} points</p>
        <button
          className="font-medium text-blue-200 underline mr-auto"
          onClick={openPointsBreakdownModal}
        >
          See points breakdown
        </button>
      </div>
      <div className="relative">
        <Image
          src="/triangle-shape.svg"
          alt=""
          width={230}
          height={204}
          priority
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-9xl font-bold italic text-yellow-500 text-grotesk leading-none">
            {points}
          </p>
        </div>
      </div>
    </div>
  );

  const NoPoints = () => (
    <div className="rounded-[32px] bg-blue-800 py-12 md:px-28 sm:px-12 px-4 mx-auto max-w-4xl xl:w-[60vw] sm:w-[90vw] w-[96vw] mt-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl text-yellow-500 font-semibold font-grotesk mb-2">
          :(
        </h1>
        <p className="text-2xl text-white mb-2">You have {points} points</p>
        <button
          className="font-medium text-blue-200 underline mr-auto"
          onClick={scrollToFaq}
        >
          How to earn points
        </button>
      </div>
      <div className="relative">
        <Image
          src="/triangle-shape.svg"
          alt=""
          width={230}
          height={204}
          priority
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-9xl font-bold italic text-yellow-500 text-grotesk leading-none">
            {points}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-allo-bg bg-top bg-no-repeat pt-24 pb-16 mb-4">
      <div className="rounded-[32px] bg-blue-800 py-12 md:py-20 2xl:py-28 md:px-28 sm:px-12 px-4 mx-auto max-w-4xl xl:w-[60vw] sm:w-[90vw] w-[96vw]">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl text-blue-200 font-semibold font-grotesk">
            Check your balance
          </h1>
          <div>
            <div className="flex items-center gap-3 mb-3 w-full">
              <Input
                value={address}
                handleChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                placeholder="Address or ENS"
              />

              <Button
                type="primary"
                onClick={checkPoints}
                isLoading={isDataLoading}
              >
                Check points
              </Button>
            </div>
            <p className="text-sm text-grey-100">
              Manually add an address or connect your wallet
            </p>
          </div>
        </div>
      </div>

      {points !== undefined && points == 0 && <NoPoints />}
      {!!points && <Congratulations />}
    </section>
  );
};
export default function Start() {
  const { isConnected, address: userAddress } = useAccount();
  const [address, setAddress] = useState<string>();

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isPointsBreakdownModalOpen, setIsPointsBreakdownModalOpen] =
    useState(false);
  const [points, setPoints] = useState<number>();
  const faqRef = useRef<HTMLElement | null>(null);
  const scrollToFaq = () => {
    faqRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const getPointsByAddress = (address: string) => {
    // TODO: implement data fetching by ens/address
    if (isAddress(address)) {
    }

    setPoints(Math.floor(Math.random() * 100));
  };

  const checkPoints = () => {
    setIsDataLoading(true);
    setTimeout(() => {
      address && getPointsByAddress(address);
      setIsDataLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (isConnected) setAddress(userAddress);
  }, [isConnected, userAddress]);

  enum Role {
    DONOR = "donor",
    ROUND_OWNER = "round_owner",
    CONTRACT_DEPLOYER = "contract_deployer",
    GRANT_OWNER = "grant_owner",
  }

  interface BreakdownData {
    date: string;
    role: Role;
    points: number;
    tx: string;
  }

  const BreakdownModal = () => {
    const getActionFromRole = (role: Role) => {
      switch (role) {
        case Role.CONTRACT_DEPLOYER:
          return "contract deployed";
        case Role.DONOR:
          return "donation";
        case Role.GRANT_OWNER:
          return "grant owner";
        case Role.ROUND_OWNER:
          return "round owner";
      }
    };
    const data: BreakdownData[] = [
      {
        date: "2024-08-28",
        role: "donor" as Role,
        points: 10,
        tx: "1",
      },
      {
        date: "2024-08-28",
        role: "round_owner" as Role,
        points: 10,
        tx: "2",
      },
      {
        date: "2024-08-28",
        role: "grant_owner" as Role,
        points: 10,
        tx: "3",
      },
      {
        date: "2024-08-28",
        role: "donor" as Role,
        points: 10,
        tx: "4",
      },
      {
        date: "2024-08-28",
        role: "round_owner" as Role,
        points: 10,
        tx: "2",
      },
      {
        date: "2024-08-28",
        role: "grant_owner" as Role,
        points: 10,
        tx: "3",
      },
      {
        date: "2024-08-28",
        role: "donor" as Role,
        points: 10,
        tx: "4",
      },
      {
        date: "2024-08-28",
        role: "round_owner" as Role,
        points: 10,
        tx: "2",
      },
      {
        date: "2024-08-28",
        role: "grant_owner" as Role,
        points: 10,
        tx: "3",
      },
      {
        date: "2024-08-28",
        role: "donor" as Role,
        points: 10,
        tx: "4",
      },
    ];

    return (
      <InfoModal
        isOpen={isPointsBreakdownModalOpen}
        setIsOpen={setIsPointsBreakdownModalOpen}
      >
        <div>
          <div className="mb-12 flex items-center justify-between">
            <h1 className="text-4xl text-blue-800 font-semibold font-grotesk leading-relaxed">
              Points <br />
              breakdown
            </h1>
            <div className="relative">
              <Image
                src="/triangle-shape.svg"
                alt=""
                width={111}
                height={98}
                priority
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <p className="text-6xl font-bold italic text-blue-800 text-grotesk leading-none">
                  {points}
                </p>
              </div>
            </div>
          </div>
          <div className="max-h-[30vh] overflow-y-auto">
            {data.map((entry) => (
              <div className="" key={entry.tx}>
                <span className="text-grey-400 mr-2">{entry.date}</span>
                <span className="text-blue-800 font-medium">
                  {entry.points} pts for {getActionFromRole(entry.role)}
                </span>
              </div>
            ))}
            <div></div>
          </div>
        </div>
      </InfoModal>
    );
  };

  const Leaderboard = () => {
    const data = [
      {
        address: "someone.eth",
        points: 300,
      },
      {
        address: "someone.eth",
        points: 280,
      },
      {
        address: "someone.eth",
        points: 270,
      },
      {
        address: "someone.eth",
        points: 270,
      },
      {
        address: "someone.eth",
        points: 220,
      },
      {
        address: "someone.eth",
        points: 300,
      },
      {
        address: "someone.eth",
        points: 300,
      },
    ];

    enum LeaderboardFilter {
      THIS_WEEK = "current-week",
      LAST_WEEK = "last-week",
      ALL_TIME = "all-time",
    }
    const filters = [
      {
        value: LeaderboardFilter.THIS_WEEK,
        label: "This week",
      },
      {
        value: LeaderboardFilter.LAST_WEEK,
        label: "Last week",
      },
      {
        value: LeaderboardFilter.ALL_TIME,
        label: "All time",
      },
    ];
    const [selectedFilter, setSelectedFilter] = useState<LeaderboardFilter>(
      LeaderboardFilter.THIS_WEEK
    );

    useEffect(() => {
      // TODO: fetch data based on filter
    }, [selectedFilter]);

    return (
      <section className="max-w-xl mx-auto w-full">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2 className="sm:text-4xl text-2xl text-blue-600 font-semibold font-grotesk">
            Leaderboard
          </h2>
          <div className="flex items-center gap-1">
            {filters.map((entry, index) => (
              <div key={entry.value} className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedFilter(entry.value)}
                  className={selectedFilter == entry.value ? "font-bold" : ""}
                >
                  {entry.label}
                </button>
                {index !== filters.length - 1 && <span>|</span>}
              </div>
            ))}
          </div>
        </div>

        {data.map((entry) => (
          <div
            key={entry.address}
            className="px-7 py-4 flex items-center justify-between odd:bg-grey-100"
          >
            <p className="text-xl">{entry.address}</p>
            <p className="text-xl">{entry.points} pts</p>
          </div>
        ))}
      </section>
    );
  };

  const Faq = () => {
    const faqs = [
      {
        question: "What can you do with Allo points?",
        response: "Nothing Yet, But Stay Tooned!",
      },
      {
        question: "What apps can I use on Allo?",
        response: "Go to xyz.xyz and view the allo app directory.",
      },
      {
        question: "How can I build on Allo?",
        response: "Go to docs.allo.gitcoin.co and  start building",
      },
      {
        question: "How can I join the Gitcoin ciztiens/ Allo Accelerator",
        response: "Go to xyz.xyz and apply today. . ",
      },
      {
        question: "How do you Earn Points?",
        response:
          "Every $1 spent on Allo equals approximately 5 points. 1 point for the round operator, 1 for the grant owner, 1 for the contributor, allo contract dev and 1 for the network it was run on",
      },
    ];
    return (
      <section className="max-w-xl mx-auto w-full" ref={faqRef}>
        <h2 className="sm:text-4xl text-2xl text-blue-600 font-semibold text-center font-grotesk mb-8">
          FAQ
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-blue-600 py-4 px-8"
            >
              <h3 className="font-bold text-xl text-blue-600 font-grotesk mb-2">
                {faq.question}
              </h3>
              <p>{faq.response}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  return (
    <div className="min-h-screen pb-20">
      <CheckBalance
        openPointsBreakdownModal={() => setIsPointsBreakdownModalOpen(true)}
        address={address}
        points={points}
        setAddress={setAddress}
        scrollToFaq={scrollToFaq}
        checkPoints={checkPoints}
        isDataLoading={isDataLoading}
      />

      <div className="flex flex-col gap-16">
        <Leaderboard />
        <Faq />
      </div>

      {/* modals */}
      <BreakdownModal />
    </div>
  );
}
