import React, { useState } from 'react'
import Label from './label';
import { Switch } from "@headlessui/react";

function SwitchPph({form}) {

    const [pph, setPph] = useState("no")
  return (
    <div>
          <div className="flex">
              <div className="justify-start flex w-full">
                <Label>PPH Agreement</Label>
              </div>
              <div className="justify-end flex w-full">
                <div className="mx-2">
                  <Switch
                    onChange={() => {
                      if (pph == "no") {
                        form.setFieldValue("ya");
                        setPph('ya')
                      } else {
                        form.setFieldValue("no");
                        setPph("no")
                      }
                    }}
                    // onChange={({ value }) => form.setFieldValue(field.name, value)}
                    className={`${
                        pph === "ya" ? "bg-black" : "bg-red-300"
                    } relative inline-flex h-4 w-8 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                       pph === "ya"
                          ? "translate-x-4 bg-white"
                          : "translate-x-1 bg-red-500"
                      } inline-block h-3 w-3 transform rounded-full duration-300`}
                    />
                  </Switch>{" "}
                </div>
                <div>{pph === "ya" ? "Yes" : "no"} </div>
              </div>
            </div>
    </div>
  )
}

export default SwitchPph