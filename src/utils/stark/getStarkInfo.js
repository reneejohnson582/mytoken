import axios from "axios";

async function getStarkInfo(address) {
    try {
        const url = "https://starkscan.stellate.sh/";
        const headers = {
            'authority': "starkscan.stellate.sh",
            'accept': "application/json",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "content-type": "application/json",
        };
        const Json_data = {
            query:
                "query ContractPageQuery(\n  $input: ContractInput!\n) {\n  contract(input: $input) {\n    contract_address\n    is_starknet_class_code_verified\n    implementation_type\n    ...ContractPageOverviewTabFragment_contract\n    ...ContractPageClassCodeHistoryTabFragment_contract\n    ...ContractFunctionReadWriteTabFragment_contract\n    id\n  }\n}\n\nfragment ContractFunctionReadCallsFragment_starknetClass on StarknetClass {\n  is_code_verified\n  abi_final\n}\n\nfragment ContractFunctionReadWriteTabFragment_contract on Contract {\n  contract_address\n  starknet_class {\n    ...ContractFunctionReadCallsFragment_starknetClass\n    ...ContractFunctionWriteCallsFragment_starknetClass\n    id\n  }\n}\n\nfragment ContractFunctionWriteCallsFragment_starknetClass on StarknetClass {\n  is_code_verified\n  abi_final\n}\n\nfragment ContractPageClassCodeHistoryTabFragment_contract on Contract {\n  contract_address\n  starknet_class {\n    is_code_verified\n    id\n  }\n  ...ContractPageCodeSubTabFragment_contract\n}\n\nfragment ContractPageCodeSubTabFragment_contract on Contract {\n  starknet_class {\n    class_hash\n    ...StarknetClassCodeTabFragment_starknetClass\n    id\n  }\n}\n\nfragment ContractPageOverviewTabClassHashPlacedAtItemFragment_contract on Contract {\n  deployed_at_transaction_hash\n  class_hash_placed_at_transaction_hash\n  class_hash_placed_at_timestamp\n}\n\nfragment ContractPageOverviewTabEthBalanceItemFragment_contract on Contract {\n  eth_balance {\n    balance_display\n    id\n  }\n}\n\nfragment ContractPageOverviewTabFragment_contract on Contract {\n  contract_address\n  class_hash\n  name_tag\n  is_social_verified\n  deployed_by_contract_address\n  deployed_by_contract_identifier\n  deployed_at_transaction_hash\n  deployed_at_timestamp\n  ...ContractPageOverviewTabEthBalanceItemFragment_contract\n  ...ContractPageOverviewTabTypeItemFragment_contract\n  ...ContractPageOverviewTabStarknetIDItemFragment_contract\n  starknet_class {\n    ...StarknetClassVersionItemFragment_starknetClass\n    id\n  }\n  ...ContractPageOverviewTabClassHashPlacedAtItemFragment_contract\n}\n\nfragment ContractPageOverviewTabStarknetIDItemFragment_contract on Contract {\n  starknet_id {\n    domain\n  }\n}\n\nfragment ContractPageOverviewTabTypeItemFragment_contract on Contract {\n  implementation_type\n  starknet_class {\n    type\n    id\n  }\n}\n\nfragment StarknetClassCodeTabAbiAndByteCodeItemFragment_starknetClass on StarknetClass {\n  is_code_verified\n  abi_final\n  bytecode\n  sierra_program\n}\n\nfragment StarknetClassCodeTabFragment_starknetClass on StarknetClass {\n  ...StarknetClassCodeTabVerifiedItemFragment_starknetClass\n  ...StarknetClassCodeTabSourceCodeItemFragment_starknetClass\n  ...StarknetClassCodeTabAbiAndByteCodeItemFragment_starknetClass\n}\n\nfragment StarknetClassCodeTabSourceCodeItemFragment_starknetClass on StarknetClass {\n  class_hash\n  verified {\n    source_code\n  }\n}\n\nfragment StarknetClassCodeTabVerifiedItemFragment_starknetClass on StarknetClass {\n  is_code_verified\n  verified {\n    name\n    source_code\n    verified_at_timestamp\n  }\n}\n\nfragment StarknetClassVersionItemFragment_starknetClass on StarknetClass {\n  is_cairo_one\n}\n",
            variables: {
                input: {
                    contract_address: address,
                },
            },
        };
        const response = await axios.post(url, Json_data, {headers: headers});
        const eth_balance = response.data.data.contract.eth_balance.balance_display;
        const stark_id = response.data.data.contract.starknet_id ? response.data.data.contract.starknet_id.domain : "null";
        const deployed_at_timestamp = response.data.data.contract.deployed_at_timestamp;
        return {
            eth_balance: parseFloat(eth_balance).toFixed(3),
            stark_id: stark_id === "null" ? "无" : stark_id,
            deployed_at_timestamp: deployed_at_timestamp,
        }
    } catch (e) {
        console.log(e)
        return {
            eth_balance: "Error",
            stark_id: "Error",
            deployed_at_timestamp: "Error",
        }
    }

}

export default getStarkInfo;
