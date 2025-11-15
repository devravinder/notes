# TypeScript Notes

This document contains notes and learning topics related to TypeScript.

## Topics to Learn

### Recursive Types

A key concept to explore is the creation of recursive types. These are types that can refer to themselves, which is useful for defining nested data structures.

**Example Problem:**

-   Define a type called `NestedPath` that can represent a dot-separated path to any property within a deeply nested object.

    For example, given an object like:
    ```typescript
    const obj = {
      a: {
        b: {
          c: 1
        }
      },
      d: 2
    };
    ```
    The `NestedPath` type should allow for strings like `"d"`, `"a.b"`, and `"a.b.c"`, but not invalid paths like `"a.c"`.
