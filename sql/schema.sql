CREATE TABLE public.links (
    uuid character varying NOT NULL,
    created_at timestamp NOT NULL,
    original_link character varying NOT NULL,
    short_link character varying NOT NULL,
    clicks bigint NOT NULL DEFAULT 0
);

ALTER TABLE public.links OWNER TO postgres;

ALTER TABLE ONLY public.links ADD CONSTRAINT links_pkey PRIMARY KEY (uuid);

ALTER TABLE public.links ADD CONSTRAINT links_unique_key UNIQUE (original_link);
