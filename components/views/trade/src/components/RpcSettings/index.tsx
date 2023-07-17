import { useState, Fragment, useEffect } from 'react';
import { HiCog, HiSelector, HiOutlineInformationCircle } from 'react-icons/hi';
import { BsCheck, BsCheckCircle } from 'react-icons/bs';
import { RPC_URL } from '../../settings/rpc';
import { Listbox, Transition } from '@headlessui/react';

import { useValidateRpc } from '../../hooks';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
interface IRpc {
  name: string;
  url: string;
}

const RPCS: IRpc[] = [
  { name: 'Bonfida', url: RPC_URL as string },
  { name: 'Serum', url: 'https://solana-api.projectserum.com' },
  { name: 'Custom', url: '' },
];

export const RpcSettings = ({
  setCustomRpc,
}: {
  setCustomRpc: (url: string) => void;
}) => {
  const [selected, setSelected] = useState(RPCS[0]);
  const [input, setInput] = useState('');
  const [custom, setCustom] = useState(false);
  const { data: validUrl, loading } = useValidateRpc(
    !!input ? input : selected.url
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const rpc = RPCS.find(({ url }) => input === url);
    if (!rpc) {
      setCustom(true);
      setSelected(RPCS[2]);
    } else {
      setCustom(false);
      setSelected(rpc);
    }
  }, [input, custom]);

  const handleOnChange = (e: IRpc) => {
    setSelected(e);
    setCustom(false);
    setInput(e.url);
  };

  const handleSave = () => {
    setVisible(false);
    if (validUrl) {
      setCustomRpc(custom ? input : selected.url);
      toast.info(`RPC node updated 👌`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mr-2 rounded-xl">
          <HiCog className="w-5 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2 className="mb-2 text-lg font-bold text-black">RPC Settings</h2>
          </DialogTitle>
          <DialogDescription>
            <div>
              {/* Dropdown */}
              <div className="top-16 w-full">
                <Listbox value={selected} onChange={handleOnChange}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative h-[60px] w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left font-bold shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-lg">
                      <span className="block truncate text-black">
                        {selected.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiSelector
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-lg font-bold shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-lg">
                        {RPCS.slice(0, 2).map((rpc, idx) => (
                          <Listbox.Option
                            key={idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? 'bg-[#E4E9EE] font-bold text-black'
                                  : 'text-gray-900'
                              }`
                            }
                            value={rpc}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {rpc.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <BsCheck
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>

              {/* Input */}
              <div className="mt-5">
                <div
                  className={clsx(
                    custom && '',
                    'h-[50px] rounded-[6px] p-[2px]',
                    'h-[60px]'
                  )}
                >
                  <input
                    value={custom ? input : selected.url}
                    onChange={(e) => setInput(e.target.value.trim())}
                    placeholder={selected.url}
                    type="text"
                    className="h-full w-full rounded-[5px] bg-white p-2 text-lg font-bold text-black focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 flex h-[24px] flex-row items-center justify-center">
                {!loading && !validUrl && (
                  <>
                    <HiOutlineInformationCircle className="mr-4 h-[20px] text-red-400" />
                    <span className="font-bold">Please enter a valid URL</span>
                  </>
                )}
                {!loading && validUrl && (
                  <>
                    <BsCheckCircle className="mr-4 h-[20px] text-green-400" />
                    <span className="font-bold">Valid RPC Node</span>
                  </>
                )}
                {loading && <progress className="progress w-56"></progress>}
              </div>
            </div>

            <div className="mt-5">
              <Button
                className="h-[50px] w-full bg-[#E5E7EB] p-2 font-bold uppercase rounded-xl"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
