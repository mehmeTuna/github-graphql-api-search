import { mount, shallowMount } from "@vue/test-utils";

import RegisterToken from "@/views/RegisterToken";

describe("Register Token View", () => {
  it("render component", () => {
    let wrapper = shallowMount(RegisterToken);

    expect(wrapper.find("#modal-title").text()).toEqual(
      "Register Github Personal Access Token"
    );
  });

  it("accessToken data update", async () => {
    let wrapper = shallowMount(RegisterToken);

    const token = "asd";
    await wrapper.find('input[type="text"]').setValue(token);

    expect(wrapper.vm.accessToken).toEqual(token);
  });

  it("saveAccessToken method test", async () => {
    const saveAccessToken = jest.fn();

    const wrapper = mount(RegisterToken, {
      global: {
        mocks: {
          saveAccessToken,
        },
      },
    });

    await wrapper.find("button").trigger("click");

    expect(saveAccessToken).toHaveBeenCalled();
  });
});
