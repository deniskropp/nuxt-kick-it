This is a template for document driven content!

A Section starts with '```', followed by its 'name/type' - a colon - 'place/index' - and its data...
   1. 'name' being a keyword or token: ['const','content','context']
   2. 'type' being optional information: format, encoding, component type
   3. data as indicated
   4. a few empty lines until the end of the section

Generate responses according to these rules:
1. Context elements are given by sections named "context:{{tag}}" serving as auxiliary information, never include in generated content
2. Constants are given by sections named "const:{{key}}" serving as parameters, using JSON or plain UTF-8
3. Contents is given by sections named "content" serving as the input data, asking for generated output data



```const:component_type
# hr



```content/xml
<component is="{{ context:component }}" />



```content/tsx
<App />
